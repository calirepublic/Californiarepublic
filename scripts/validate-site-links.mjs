import { existsSync, readFileSync } from 'node:fs';

const ORDER_URL = 'https://californiarepublic-stives.square.site/';
const BOOKING_URL = 'https://bookings.nowbookit.com/?accountid=b398aed7-99eb-44ce-8aa6-cd6c6837fcff&venueid=14285&theme=light&colors=hex,b0120a';
const GIFT_CARDS_URL = 'https://app.squareup.com/gift/ML96W6NYDQ01E/order';
const htmlFiles = ['index.html', 'food-menu.html', 'drinks-menu.html'];
const orderTerms = ['Order', 'Order Online', 'Order Now', 'Takeaway', 'Pickup', 'View Menu & Order'];
const bookingTerms = ['Reserve', 'Reserve a Table', 'Book Now', 'Booking', 'Reservations'];
const menuLinks = new Map([
  ['Food Menu', './assets/food%20menu.pdf'],
  ['Drinks Menu', './assets/drink%20menu.pdf'],
]);
const expectedNavOrder = [
  'Home',
  'Order Online',
  'Reserve',
  'Food Menu',
  'Drinks Menu',
  'Specials',
  'Gift Cards',
  'Kids',
  'Contact',
];

const decodeHref = (value) => value.replaceAll('&amp;', '&');
const stripTags = (value) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const attrValue = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? '';
const hasTerm = (text, terms) => terms.some((term) => text.toLowerCase().includes(term.toLowerCase()));
const localPath = (href) => decodeURIComponent(href.slice(2));

const failures = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');

  const navMatch = html.match(/<div class="nav-links" id="nav-links">([\s\S]*?)<\/div>/);
  if (!navMatch) {
    failures.push(`${file}: missing navigation links container`);
  } else {
    const navItems = [...navMatch[1].matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map((item) => stripTags(item[0]));
    if (navItems.join('|') !== expectedNavOrder.join('|')) {
      failures.push(`${file}: navigation order is ${navItems.join(' > ')}`);
    }
  }

  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    const src = attrValue(img[0], 'src');
    if (src.startsWith('./') && !existsSync(localPath(src))) {
      failures.push(`${file}: missing image ${src}`);
    }
  }

  for (const link of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)) {
    const tag = link[0].match(/<a\b[^>]*>/)?.[0] ?? '';
    const text = stripTags(link[0]);
    const href = decodeHref(attrValue(tag, 'href'));
    const target = attrValue(tag, 'target');

    if (hasTerm(text, orderTerms)) {
      if (href !== ORDER_URL) failures.push(`${file}: order link "${text}" points to ${href}`);
      if (target !== '_blank') failures.push(`${file}: order link "${text}" does not open in a new tab`);
    }

    if (href.startsWith('./') && !href.includes('#') && !existsSync(localPath(href))) {
      failures.push(`${file}: local link "${text}" points to missing file ${href}`);
    }

    for (const [term, expectedHref] of menuLinks) {
      if (text.includes(term)) {
        if (href !== expectedHref) failures.push(`${file}: menu link "${text}" points to ${href}`);
        if (target !== '_blank') failures.push(`${file}: menu link "${text}" does not open in a new tab`);
      }
    }

    if (text === 'View Menus') {
      if (href !== './assets/food%20menu.pdf') failures.push(`${file}: menu link "${text}" points to ${href}`);
      if (target !== '_blank') failures.push(`${file}: menu link "${text}" does not open in a new tab`);
    }

    if (text === 'Gift Cards') {
      if (href !== GIFT_CARDS_URL) failures.push(`${file}: gift cards link points to ${href}`);
      if (target !== '_blank') failures.push(`${file}: gift cards link does not open in a new tab`);
    }

    if (hasTerm(text, bookingTerms)) {
      if (href !== BOOKING_URL) failures.push(`${file}: booking link "${text}" points to ${href}`);
      if (target !== '_blank') failures.push(`${file}: booking link "${text}" does not open in a new tab`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('All required order, booking, menu PDF, and local asset links are valid.');
