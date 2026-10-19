const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function post(path, payload) {
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw { message: 'Cannot reach the server. Please check your connection and try again.' };
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { message: data.message || 'Request failed.', errors: data.errors };
  if (data && data.emailed === false) console.warn('[reflexo] Server could not send email:', data.warning);
  return data;
}

export const sendContact = (payload) => post('/api/contact', payload);
export const sendChat = (payload) => post('/api/chat', payload);
