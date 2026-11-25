/** Narration for every scene. Scenes 1–6 run inside the scroll story. */
export const storyScenes = [
  {
    id: 1,
    label: 'The Restaurant',
    kicker: 'Chapter 01',
    title: 'Every Restaurant Has a Story.',
    body: 'Meet Rahul. He owns a beautiful restaurant and loves serving delicious food.',
  },
  {
    id: 2,
    label: 'The Problem',
    kicker: 'Chapter 02',
    title: "But Managing Menus Isn't Always Easy.",
    body: 'Printing new menus, changing prices and updating food details takes time.',
    points: ['Reprinting menus', 'Updating prices manually', 'Old food photos', 'Outdated menu information'],
  },
  {
    id: 3,
    label: 'The Discovery',
    kicker: 'Chapter 03',
    title: 'What If Your Menu Could Be Digital?',
    body: 'One day, Rahul discovers a smarter way to present his restaurant menu.',
  },
  {
    id: 4,
    label: 'Scan',
    kicker: 'Chapter 04',
    title: "Just Scan. That's It.",
    body: 'Customers simply scan the QR code placed on their restaurant table.',
  },
  {
    id: 5,
    label: 'Explore',
    kicker: 'Chapter 05',
    title: 'Explore the Menu on Your Phone.',
    body: 'Customers can view food categories, beautiful food photographs, descriptions and prices.',
  },
  {
    id: 6,
    label: 'Transformation',
    kicker: 'Chapter 06',
    title: 'A Smarter Menu. A Better Experience.',
    body: 'Rahul now has a modern way to present his restaurant menu.',
  },
];

/** Labels for the progress indicator (all eight scenes). */
export const chapterNav = [
  ...storyScenes.map((s) => ({ id: s.id, label: s.label, target: `scene-${s.id}` })),
  { id: 7, label: 'Your QR Menu', target: 'features', also: ['clients', 'pricing'] },
  { id: 8, label: 'Get Started', target: 'contact' },
];
