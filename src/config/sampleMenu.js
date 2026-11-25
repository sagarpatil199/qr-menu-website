/**
 * Sample restaurant shown inside the smartphone demo.
 * Change anything here to customise the demo menu.
 * `art` picks one of the built-in SVG food illustrations:
 *   biryani | paneer | dosa | thali | lassi | chai | gulab | samosa
 */
export const sampleRestaurant = {
  name: "Rahul's Rasoi",
  initials: 'RR',
  tagline: 'Pure veg · Family restaurant',
  hours: 'Open today · 11 AM – 11 PM',
  categories: ['Popular', 'Main Course', 'South Indian', 'Beverages', 'Desserts'],
  items: [
    { name: 'Veg Biryani', price: 180, category: 'Popular', veg: true, art: 'biryani',
      desc: 'Fragrant basmati rice layered with vegetables, saffron and whole spices.' },
    { name: 'Paneer Butter Masala', price: 220, category: 'Main Course', veg: true, art: 'paneer',
      desc: 'Soft paneer cubes in a rich, buttery tomato gravy.' },
    { name: 'Masala Dosa', price: 90, category: 'South Indian', veg: true, art: 'dosa',
      desc: 'Crisp rice crêpe with spiced potato filling, sambar and chutney.' },
    { name: 'North Indian Thali', price: 160, category: 'Popular', veg: true, art: 'thali',
      desc: 'Dal, two sabzis, rice, roti, salad and a sweet — a complete meal.' },
    { name: 'Samosa (2 pcs)', price: 40, category: 'Popular', veg: true, art: 'samosa',
      desc: 'Golden pastry with spiced potato and peas, served with chutney.' },
    { name: 'Sweet Lassi', price: 60, category: 'Beverages', veg: true, art: 'lassi',
      desc: 'Chilled, thick yoghurt drink topped with malai.' },
    { name: 'Masala Chai', price: 25, category: 'Beverages', veg: true, art: 'chai',
      desc: 'Strong tea brewed with ginger, cardamom and milk.' },
    { name: 'Gulab Jamun (2 pcs)', price: 50, category: 'Desserts', veg: true, art: 'gulab',
      desc: 'Warm milk dumplings soaked in rose-cardamom syrup.' },
  ],
};
