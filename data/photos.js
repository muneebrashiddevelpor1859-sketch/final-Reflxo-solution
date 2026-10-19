// Office / team photographs (optimised copies live in /public/images/office).
export const OFFICE = [
  { src: '/images/office/o01.jpg', alt: 'Team working together in an open office' },
  { src: '/images/office/o02.jpg', alt: 'Team meeting around a digital strategy screen' },
  { src: '/images/office/o03.jpg', alt: 'Designer reviewing an interface on a laptop' },
  { src: '/images/office/o04.jpg', alt: 'Developers working at their desks' },
  { src: '/images/office/o05.jpg', alt: 'Colleagues in a standing planning meeting' },
  { src: '/images/office/o06.jpg', alt: 'Team discussing charts on a whiteboard' },
  { src: '/images/office/o07.jpg', alt: 'Business meeting in a glass meeting room' },
  { src: '/images/office/o08.jpg', alt: 'Client meeting around a boardroom table' },
  { src: '/images/office/o09.jpg', alt: 'Team reviewing documents together' },
  { src: '/images/office/o10.jpg', alt: 'Group discussion around a round table' },
  { src: '/images/office/o11.jpg', alt: 'Colleagues working at a shared desk' },
];

// One picture of its own for every card (services, projects, posts): every key points to a different file
// in /public/images/cards (cropped from the office photographs), so no two cards ever show the same image.
const card = (file, i) => ({ src: `/images/cards/${file}.jpg`, alt: OFFICE[i].alt });

const MAP = {
  // services
  'web-development': card('o03-a', 2), 'graphic-design': card('o04-a', 3), 'software-development': card('o01-a', 0),
  'ai-automation': card('o06-a', 5), 'ai-agents': card('o02-a', 1),
  // portfolio
  'Atlas Logistics': card('o07-a', 6), 'Maison Noor': card('o08-a', 7), 'LeadFlow Automation': card('o05-a', 4),
  'Sage Support Agent': card('o09-a', 8), 'Orbit Analytics': card('o10-a', 9), 'Verde Wellness': card('o11-a', 10),
  // blog
  'AI agents vs chatbots: what your business actually needs': card('o03-b', 2),
  'Why a slower website quietly costs you customers': card('o06-b', 5),
  'Five follow-ups you should automate this month': card('o08-b', 7),
  "What a brand identity actually includes (and what it doesn't)": card('o10-b', 9),
};

// pictures for any new service / project / post you add later (unused crops, picked by name)
const SPARE = ['o01-b', 'o02-c', 'o03-c', 'o04-b', 'o05-c', 'o06-c', 'o07-c', 'o08-c', 'o09-c', 'o10-c', 'o11-c', 'o01-c', 'o04-c'].map((f) => card(f, parseInt(f.slice(1, 3), 10) - 1));

export function photoFor(seed = '') {
  if (MAP[seed]) return MAP[seed];
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return SPARE[h % SPARE.length];
}
