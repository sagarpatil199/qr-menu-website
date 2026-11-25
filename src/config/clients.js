/**
 * Live client menus shown in the "Our Clients" section.
 * To add a new client: drop a phone screenshot into src/assets/images/clients/,
 * import it below and add an entry to the list.
 */
import ruchkar from '../assets/images/clients/ruchkar.webp';
import ramdev from '../assets/images/clients/ramdev.webp';
import shivneri from '../assets/images/clients/shivneri.webp';

export const clients = [
  {
    name: 'Hotel Ruchkar Katta',
    type: 'Family dining · Veg & non-veg',
    highlights: ['Veg / non-veg filters', 'Menu search', 'Google Review button'],
    url: 'https://ruchkar.myqrmenu.online/',
    image: ruchkar,
  },
  {
    name: 'Ramdev Rajasthani Foji Dhaba',
    type: 'Pure veg dhaba · Nipani, Karnataka',
    highlights: ['Hindi + English menu', 'Map button', 'WhatsApp & Instagram'],
    url: 'http://ramdev-rajasthani-foji-dhaba.myqrmenu.online/',
    image: ramdev,
  },
  {
    name: 'Shree Shivneri Dhaba',
    type: 'Pure veg · Parcel Seva · Saidapur',
    highlights: ['Marathi + English menu', 'Zomato link', 'Live open/closed status'],
    url: 'https://shree-shivneri-dhaba-parcle-seva.myqrmenu.online/',
    image: shivneri,
  },
];
