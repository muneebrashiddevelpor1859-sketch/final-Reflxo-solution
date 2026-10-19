'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { sendContact } from '@/lib/api';
import { services } from '@/data/services';
import Button from '../ui/Button';

const budgets = [
  'Under $1,000',
  '$1,000 - $3,000',
  '$3,000 - $10,000',
  '$10,000+',
  'Not sure yet',
];

const empty = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

export default function ContactForm() {
  const params = useSearchParams();

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMsg, setServerMsg] = useState('');

  useEffect(() => {
    const service = params.get('service');

    if (service) {
      setForm((current) => ({
        ...current,
        service,
      }));
    }
  }, [params]);

  const set = (key) => (event) => {
    const value = event.target.value;

    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = 'Please enter your name.';
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (form.message.trim().length < 10) {
      newErrors.message =
        'Tell us a bit more (min 10 characters).';
    }

    return newErrors;
  };

  const submit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('sending');
    setServerMsg('');

    try {
      // Only real form fields are sent
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        service: form.service,
        budget: form.budget,
        message: form.message.trim(),
      };

      const response = await sendContact(payload);

      setServerMsg(
        response?.message ||
          'Your message has been sent successfully.'
      );

      setStatus('done');
      setForm(empty);
      setErrors({});
    } catch (error) {
      console.error('Contact form error:', error);

      if (error?.errors) {
        setErrors(error.errors);
      }

      setServerMsg(
        error?.message ||
          'Something went wrong. Please try again.'
      );

      setStatus('error');
    }
  };

  return (
    <div className="form-wrap">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="done"
            className="form-done"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <motion.circle
                cx="32"
                cy="32"
                r="29"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 0.9,
                }}
              />

              <motion.path
                d="M19 33l9 9 17-19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                }}
              />
            </svg>

            <h2 className="h2">
              Message sent
            </h2>

            <p className="lead">
              {serverMsg}
            </p>

            <Button
              variant="line"
              onClick={() => {
                setStatus('idle');
                setServerMsg('');
              }}
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            className="form"
            exit={{ opacity: 0 }}
          >
            {/* NAME + EMAIL */}
            <div className="field-row">
              <Field
                label="Name *"
                error={errors.name}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
              </Field>

              <Field
                label="Email *"
                error={errors.email}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </Field>
            </div>

            {/* PHONE + COMPANY */}
            <div className="field-row">
              <Field label="Phone / WhatsApp">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
              </Field>

              <Field label="Company">
                <input
                  type="text"
                  value={form.company}
                  onChange={set('company')}
                  autoComplete="organization"
                />
              </Field>
            </div>

            {/* SERVICE + BUDGET */}
            <div className="field-row">
              <Field label="Service you need">
                <select
                  value={form.service}
                  onChange={set('service')}
                >
                  <option value="">
                    Select a service
                  </option>

                  {services.map((service) => (
                    <option
                      key={service.slug}
                      value={service.title}
                    >
                      {service.title}
                    </option>
                  ))}

                  <option value="Something else">
                    Something else
                  </option>
                </select>
              </Field>

              <Field label="Budget">
                <select
                  value={form.budget}
                  onChange={set('budget')}
                >
                  <option value="">
                    Select a range
                  </option>

                  {budgets.map((budget) => (
                    <option
                      key={budget}
                      value={budget}
                    >
                      {budget}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* MESSAGE */}
            <Field
              label="Tell us about your project *"
              error={errors.message}
            >
              <textarea
                rows={5}
                value={form.message}
                onChange={set('message')}
              />
            </Field>

            {/* SERVER ERROR */}
            {status === 'error' && (
              <p
                className="form-error"
                role="alert"
              >
                {serverMsg}
              </p>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? 'Sending...'
                : 'Send message'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}) {
  return (
    <label
      className={`field ${
        error ? 'has-error' : ''
      }`}
    >
      <span className="field-label">
        {label}
      </span>

      {children}

      <span className="field-line" />

      {error && (
        <span className="field-error">
          {error}
        </span>
      )}
    </label>
  );
}