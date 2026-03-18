const db = require('./db');

console.log('Seeding database...');

// Clear existing data
db.exec(`
  DELETE FROM settings;
  DELETE FROM theme_vars;
  DELETE FROM content_blocks;
  DELETE FROM page_meta;
  DELETE FROM images;
`);

// ── Settings ──────────────────────────────────────────────
const settings = {
  site_name: 'Dublin T-Shirt Print',
  site_tagline: 'Custom Printing Since 1994',
  phone_primary: '057-9152717',
  phone_secondary: '086-2717095',
  email: 'dublinteeshirtprint@gmail.com',
  whatsapp_url: 'https://wa.me/message/KX62SOYWR2JKH1',
  instagram_url: 'https://www.instagram.com/dublinteeshirtprint',
  address_street: 'Cloghan Beg',
  address_locality: 'Offaly',
  address_postcode: 'R42 AF40',
  address_country: 'Ireland',
  opening_hours: 'Mo-Su 07:00-18:00',
  opening_hours_display: '7am\u20136pm, 7 days',
  founding_year: '1994',
  logo_type: 'text',
  logo_text: 'DT',
  logo_subtext: 'Dublin T-Shirt Print',
  logo_image_path: '',
  footer_brand_desc: 'Irish-owned custom printing since 1994. T-shirts, hoodies, hats, mugs, workwear and more. Nationwide delivery with 3-4 day turnaround.',
  base_url: 'https://www.dublintshirtprint.com',
  delivery_rate: '\u20ac12.50',
  maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2387.5!2d-7.7!3d53.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDE4JzAwLjAiTiA3wrA0MicwMC4wIlc!5e0!3m2!1sen!2sie!4v1'
};

const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
for (const [key, value] of Object.entries(settings)) {
  insertSetting.run(key, value);
}
console.log('  Settings seeded');

// ── Theme Variables ──────────────────────────────────────
const themeVars = [
  { name: '--ink', value: '#FF3D00', group: 'colors', label: 'Primary (Ink)', order: 1 },
  { name: '--ink-dark', value: '#CC3100', group: 'colors', label: 'Primary Dark', order: 2 },
  { name: '--ink-light', value: '#FF6B3D', group: 'colors', label: 'Primary Light', order: 3 },
  { name: '--mint', value: '#00E5A0', group: 'colors', label: 'Accent (Mint)', order: 4 },
  { name: '--mint-dark', value: '#00B87D', group: 'colors', label: 'Accent Dark', order: 5 },
  { name: '--gold', value: '#FFB800', group: 'colors', label: 'Gold (Stars)', order: 6 },
  { name: '--bg', value: '#0C0C0C', group: 'colors', label: 'Background', order: 7 },
  { name: '--surface', value: '#141414', group: 'colors', label: 'Surface', order: 8 },
  { name: '--surface-2', value: '#1C1C1C', group: 'colors', label: 'Surface 2', order: 9 },
  { name: '--surface-3', value: '#242424', group: 'colors', label: 'Surface 3', order: 10 },
  { name: '--text', value: '#F0EDE8', group: 'colors', label: 'Text Primary', order: 11 },
  { name: '--text-muted', value: '#8A8A8A', group: 'colors', label: 'Text Muted', order: 12 },
  { name: '--text-dim', value: '#555', group: 'colors', label: 'Text Dim', order: 13 },
  { name: '--border', value: '#2A2A2A', group: 'colors', label: 'Border', order: 14 },
  { name: '--border-light', value: '#333', group: 'colors', label: 'Border Light', order: 15 }
];

const insertTheme = db.prepare('INSERT INTO theme_vars (var_name, var_value, var_group, label, sort_order) VALUES (?, ?, ?, ?, ?)');
for (const v of themeVars) {
  insertTheme.run(v.name, v.value, v.group, v.label, v.order);
}
console.log('  Theme variables seeded');

// ── Images ──────────────────────────────────────────────
const images = [
  { slot: 'hero-slide-1', path: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=70', alt: 'Custom printed t-shirts on display', w: 1200, h: 800 },
  { slot: 'hero-slide-2', path: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=70', alt: 'Custom printed hoodies', w: 1200, h: 800 },
  { slot: 'hero-slide-3', path: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1200&q=70', alt: 'Custom embroidered caps and hats', w: 1200, h: 800 },
  { slot: 'hero-slide-4', path: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&q=70', alt: 'Custom printed mugs', w: 1200, h: 800 },
  { slot: 'hero-slide-5', path: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=70', alt: 'Custom branded workwear', w: 1200, h: 800 },
  { slot: 'card-tshirts', path: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', alt: 'Custom printed t-shirts', w: 600, h: 400 },
  { slot: 'card-hoodies', path: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', alt: 'Custom printed hoodies', w: 600, h: 400 },
  { slot: 'card-hats', path: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', alt: 'Custom printed hats and caps', w: 600, h: 400 },
  { slot: 'card-mugs', path: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80', alt: 'Custom printed mugs', w: 600, h: 400 },
  { slot: 'card-bags', path: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', alt: 'Custom printed bags and totes', w: 600, h: 400 },
  { slot: 'card-workwear', path: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', alt: 'Custom hi-vis workwear', w: 600, h: 400 },
  { slot: 'products-hero', path: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1400&q=80', alt: 'Custom printed products range', w: 1400, h: 600 },
  { slot: 'detail-tshirts', path: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', alt: 'Custom printed t-shirts in various colours', w: 800, h: 533 },
  { slot: 'detail-hoodies', path: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', alt: 'Custom printed hoodies and sweatshirts', w: 800, h: 533 },
  { slot: 'detail-hats', path: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80', alt: 'Custom embroidered caps and hats', w: 800, h: 533 },
  { slot: 'detail-mugs', path: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80', alt: 'Custom printed mugs and cups', w: 800, h: 533 },
  { slot: 'detail-bags', path: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', alt: 'Custom printed tote bags', w: 800, h: 533 },
  { slot: 'detail-workwear', path: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'Custom branded workwear and hi-vis clothing', w: 800, h: 533 },
  { slot: 'detail-jerseys', path: 'https://images.unsplash.com/photo-1580089595767-98745d7025c5?w=800&q=80', alt: 'Custom sports jerseys and team kits', w: 800, h: 533 },
  { slot: 'about-printing', path: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', alt: 'Screen printing in action', w: 600, h: 400 }
];

const insertImage = db.prepare('INSERT INTO images (slot, file_path, alt_text, width, height) VALUES (?, ?, ?, ?, ?)');
for (const img of images) {
  insertImage.run(img.slot, img.path, img.alt, img.w, img.h);
}
console.log('  Images seeded');

// ── Page Meta ──────────────────────────────────────────────
const pageMeta = [
  { page: 'index', title: 'Custom T-Shirt Printing Dublin | Hoodies, Hats, Mugs & More | Dublin T-Shirt Print', description: "Ireland's trusted custom printing since 1994. Custom t-shirts, hoodies, hats, mugs & workwear. From \u20ac3.95/item. 3-4 day turnaround. Free artwork. Nationwide delivery.", keywords: 'custom t-shirt printing dublin, personalised t-shirts ireland, bulk t-shirt printing, custom hoodies dublin, printed mugs ireland, corporate workwear dublin, screen printing ireland', canonical: '/', og_title: 'Custom T-Shirt Printing Dublin | Dublin T-Shirt Print', og_desc: "Ireland's trusted custom printing since 1994. T-shirts, hoodies, hats, mugs & more from \u20ac3.95/item." },
  { page: 'products', title: 'Custom Printed Products | T-Shirts, Hoodies, Hats, Mugs & More | Dublin T-Shirt Print', description: 'Browse our full range of custom printed products: t-shirts, hoodies, hats, mugs, bags, workwear and sports jerseys. Quality printing from \u20ac3.95/item with free artwork.', keywords: 'custom t-shirts ireland, personalised hoodies, printed hats caps, custom mugs ireland, branded workwear, sports jerseys printing, bulk t-shirt orders', canonical: '/products', og_title: 'Custom Printed Products | Dublin T-Shirt Print', og_desc: 'T-shirts, hoodies, hats, mugs, bags, workwear and jerseys. Custom printed from \u20ac3.95/item.' },
  { page: 'services', title: 'Printing Methods | Screen Print, DTF, Vinyl, Sublimation | Dublin T-Shirt Print', description: 'We offer 6 professional printing methods: screen printing, DTF, vinyl, full-colour transfer, sublimation, and label printing. Each matched to your product for the best results.', keywords: 'screen printing ireland, dtf printing dublin, vinyl printing, sublimation printing, t-shirt printing methods, custom printing techniques', canonical: '/services', og_title: null, og_desc: null },
  { page: 'about', title: 'About Us | 30+ Years of Custom Printing in Ireland | Dublin T-Shirt Print', description: "Irish-owned and operated since 1994. Learn about Dublin T-Shirt Print's 30+ year journey delivering quality custom printing to businesses, clubs, and events across Ireland.", keywords: null, canonical: '/about', og_title: null, og_desc: null },
  { page: 'contact', title: 'Contact Us | Dublin T-Shirt Print | Call, Email, WhatsApp', description: 'Get in touch with Dublin T-Shirt Print. Call 057-9152717, email dublinteeshirtprint@gmail.com, or WhatsApp us. Open 7am-6pm, 7 days a week.', keywords: null, canonical: '/contact', og_title: null, og_desc: null },
  { page: 'quote', title: 'Get a Free Quote | Custom Printing | Dublin T-Shirt Print', description: 'Get a free, no-obligation quote for custom t-shirts, hoodies, hats, mugs and more. Free artwork included. Response within hours.', keywords: null, canonical: '/quote', og_title: null, og_desc: null },
  { page: 'locations/dublin', title: 'Custom T-Shirt Printing Dublin | Hoodies, Hats, Mugs | Dublin T-Shirt Print', description: "Dublin's trusted custom t-shirt printing service. Personalised t-shirts, hoodies, hats, mugs & workwear delivered across Dublin in 3-4 days. From \u20ac3.95/item. Free artwork.", keywords: 'custom t-shirt printing dublin, personalised t-shirts dublin, bulk t-shirt printing dublin, custom hoodies dublin, corporate workwear dublin, screen printing dublin, dtf printing dublin', canonical: '/locations/dublin', og_title: null, og_desc: null },
  { page: 'locations/cork', title: 'Custom T-Shirt Printing Cork | Hoodies, Hats, Mugs | Dublin T-Shirt Print', description: "Cork's trusted custom t-shirt printing service. Personalised t-shirts, hoodies, hats, mugs & workwear delivered across Cork in 3-4 days. From \u20ac3.95/item.", keywords: 'custom t-shirt printing cork, personalised t-shirts cork, bulk t-shirt printing cork', canonical: '/locations/cork', og_title: null, og_desc: null },
  { page: 'locations/galway', title: 'Custom T-Shirt Printing Galway | Hoodies, Hats, Mugs | Dublin T-Shirt Print', description: "Galway's trusted custom t-shirt printing service. Personalised t-shirts, hoodies, hats, mugs & workwear delivered across Galway in 3-4 days.", keywords: 'custom t-shirt printing galway, personalised t-shirts galway', canonical: '/locations/galway', og_title: null, og_desc: null },
  { page: 'locations/limerick', title: 'Custom T-Shirt Printing Limerick | Hoodies, Hats, Mugs | Dublin T-Shirt Print', description: "Limerick's trusted custom t-shirt printing service. Personalised t-shirts, hoodies, hats, mugs & workwear delivered across Limerick in 3-4 days.", keywords: 'custom t-shirt printing limerick, personalised t-shirts limerick', canonical: '/locations/limerick', og_title: null, og_desc: null },
  { page: 'locations/waterford', title: 'Custom T-Shirt Printing Waterford | Hoodies, Hats, Mugs | Dublin T-Shirt Print', description: "Waterford's trusted custom t-shirt printing service. Personalised t-shirts, hoodies, hats, mugs & workwear delivered across Waterford in 3-4 days.", keywords: 'custom t-shirt printing waterford, personalised t-shirts waterford', canonical: '/locations/waterford', og_title: null, og_desc: null }
];

const insertMeta = db.prepare('INSERT INTO page_meta (page, title, description, keywords, canonical_path, og_title, og_description) VALUES (?, ?, ?, ?, ?, ?, ?)');
for (const m of pageMeta) {
  insertMeta.run(m.page, m.title, m.description, m.keywords, m.canonical, m.og_title, m.og_desc);
}
console.log('  Page meta seeded');

// ── Content Blocks ──────────────────────────────────────
const insertContent = db.prepare('INSERT INTO content_blocks (page, section, block_key, content, content_type) VALUES (?, ?, ?, ?, ?)');

function c(page, section, key, content, type = 'text') {
  insertContent.run(page, section, key, content, type);
}

// ── INDEX PAGE ──
c('index', 'hero', 'badge', 'Irish-Owned \u2022 Printing Since 1994');
c('index', 'hero', 'title_line1', 'Custom Printed');
c('index', 'hero', 'title_line2', 'T-Shirts, Hoodies<br>& More', 'html');
c('index', 'hero', 'subtitle', 'From custom t-shirts and hoodies to branded mugs and workwear \u2014 we print it all. Trusted by businesses, clubs, and events across Dublin and Ireland for over 30 years.');
c('index', 'hero', 'cta_primary', 'Get a Free Quote');
c('index', 'hero', 'cta_secondary', 'Browse Products');
c('index', 'hero', 'stat1_number', '30+');
c('index', 'hero', 'stat1_label', 'Years Experience');
c('index', 'hero', 'stat2_number', '3-4');
c('index', 'hero', 'stat2_label', 'Day Turnaround');
c('index', 'hero', 'stat3_number', '\u20ac3.95');
c('index', 'hero', 'stat3_label', 'From Per Item');

// Trust bar
const trustItems = [
  { icon: '&#9201;', label: '3-4 Day Turnaround', sub: "One of Ireland's fastest" },
  { icon: '&#127912;', label: 'Free Artwork', sub: 'Design consultation included' },
  { icon: '&#128666;', label: 'Nationwide Delivery', sub: 'Flat rate &euro;12.50/box' },
  { icon: '&#127470;&#127466;', label: 'Irish-Owned', sub: 'Since 1994' },
  { icon: '&#128176;', label: 'From &euro;3.95/item', sub: 'Big savings on bulk' },
  { icon: '&#128241;', label: 'WhatsApp Support', sub: 'Quick &amp; easy ordering' }
];
trustItems.forEach((item, i) => {
  c('index', 'trust', `item${i+1}_icon`, item.icon, 'html');
  c('index', 'trust', `item${i+1}_label`, item.label, 'html');
  c('index', 'trust', `item${i+1}_sublabel`, item.sub, 'html');
});

// Products section
c('index', 'products', 'label', 'Our Products');
c('index', 'products', 'title', 'What We Print');
c('index', 'products', 'desc', 'From a single sample to thousands of units \u2014 every product is custom printed to your exact specifications.');

const productCards = [
  { key: 'tshirts', title: 'Custom T-Shirts', desc: 'Premium cotton tees with your logo, design, or message. Perfect for events, teams, and brands.', price: 'From &euro;3.95 per item', badge: 'Most Popular' },
  { key: 'hoodies', title: 'Hoodies &amp; Sweatshirts', desc: 'Cosy custom hoodies for teams, schools, and corporate wear. Multiple weights and styles.', price: 'From &euro;14.95 per item', badge: '' },
  { key: 'hats', title: 'Hats &amp; Caps', desc: 'Embroidered and printed caps, beanies, and bucket hats. Premium branding that stands out.', price: 'From &euro;6.95 per item', badge: '' },
  { key: 'mugs', title: 'Mugs &amp; Cups', desc: 'Branded ceramic mugs and travel cups. Ideal for corporate gifts, cafes, and promotions.', price: 'From &euro;4.95 per item', badge: '' },
  { key: 'bags', title: 'Bags &amp; Totes', desc: 'Eco-friendly tote bags, drawstring bags, and branded carriers. Walking billboards for your brand.', price: 'From &euro;3.50 per item', badge: '' },
  { key: 'workwear', title: 'Hi-Vis &amp; Workwear', desc: 'Branded safety vests, polo shirts, and professional workwear. Durable prints that last.', price: 'From &euro;8.95 per item', badge: '' }
];
productCards.forEach(p => {
  c('index', 'product_cards', `${p.key}_title`, p.title, 'html');
  c('index', 'product_cards', `${p.key}_desc`, p.desc, 'html');
  c('index', 'product_cards', `${p.key}_price`, p.price, 'html');
  if (p.badge) c('index', 'product_cards', `${p.key}_badge`, p.badge);
});

// Who we serve
c('index', 'markets', 'label', 'Who We Serve');
c('index', 'markets', 'title', 'Printing for Every Occasion');
c('index', 'markets', 'desc', "Whether you're a startup needing branded merch or a sports club kitting out the team, we've got you covered.");

const markets = [
  { icon: '&#127970;', title: 'Corporate &amp; Business', desc: 'Branded uniforms, promotional merchandise, and corporate gifts' },
  { icon: '&#9917;', title: 'Sports Teams &amp; Clubs', desc: 'Team jerseys, training gear, and supporter merchandise' },
  { icon: '&#127891;', title: 'Schools &amp; Universities', desc: 'Class hoodies, event tees, and graduation merchandise' },
  { icon: '&#127881;', title: 'Stag &amp; Hen Parties', desc: 'Custom party t-shirts, hats, and matching group outfits' },
  { icon: '&#10084;&#65039;', title: 'Charity &amp; Fundraising', desc: 'Event merchandise, awareness tees, and fundraiser gear' },
  { icon: '&#127867;', title: 'Hospitality &amp; Events', desc: 'Staff uniforms, branded aprons, and event merchandise' }
];
markets.forEach((m, i) => {
  c('index', 'markets', `item${i+1}_icon`, m.icon, 'html');
  c('index', 'markets', `item${i+1}_title`, m.title, 'html');
  c('index', 'markets', `item${i+1}_desc`, m.desc, 'html');
});

// Services preview
c('index', 'services_preview', 'label', 'How We Print');
c('index', 'services_preview', 'title', 'Six Printing Methods.<br>One Perfect Finish.', 'html');
c('index', 'services_preview', 'desc', 'We match the right technique to your product for the best quality and value every time.');

const serviceCards = [
  { icon: '&#127912;', title: 'Screen Printing', desc: 'Water-based inks for vibrant, long-lasting prints. Ideal for bulk orders of 25+. The gold standard for t-shirt printing.' },
  { icon: '&#127752;', title: 'DTF Printing', desc: 'Direct-to-film technology for photo-quality full-colour prints. No minimum order. Perfect for complex designs.' },
  { icon: '&#9999;&#65039;', title: 'Vinyl Printing', desc: 'Heat-pressed vinyl for bold text, numbers, and simple graphics. Durable and great for names on jerseys.' },
  { icon: '&#128248;', title: 'Full-Colour Transfer', desc: 'Photographic quality prints transferred onto garments. Perfect for detailed imagery and small runs.' },
  { icon: '&#128167;', title: 'Sublimation', desc: 'Dye-infused prints that become part of the fabric. Ideal for sportswear, mugs, and polyester garments.' },
  { icon: '&#127991;&#65039;', title: 'Label Printing', desc: 'Custom woven and printed labels for your brand. Neck labels, care labels, and hem tags available.' }
];
serviceCards.forEach((s, i) => {
  c('index', 'services_preview', `item${i+1}_icon`, s.icon, 'html');
  c('index', 'services_preview', `item${i+1}_title`, s.title, 'html');
  c('index', 'services_preview', `item${i+1}_desc`, s.desc, 'html');
});

// Testimonials
c('index', 'testimonials', 'label', 'Testimonials');
c('index', 'testimonials', 'title', 'What Our Customers Say');

const testimonials = [
  { text: '"Ordered 200 t-shirts for our charity run. The quality was brilliant and they arrived in 3 days. Couldn\'t believe the turnaround. Will definitely be back."', author: 'Sarah M.', role: 'Dublin Marathon Committee' },
  { text: '"We\'ve been using Dublin T-Shirt Print for all our club jerseys and training gear for 5 years now. Consistent quality, great prices, and the lads love the designs."', author: "Paddy O'Brien", role: 'GAA Club Secretary' },
  { text: '"Needed branded hoodies and mugs for our office. The free artwork service saved us a fortune. The quality speaks for itself \u2014 everyone in the team loves them."', author: 'Emma K.', role: 'Tech Startup, Dublin' }
];
testimonials.forEach((t, i) => {
  c('index', 'testimonials', `item${i+1}_text`, t.text);
  c('index', 'testimonials', `item${i+1}_author`, t.author);
  c('index', 'testimonials', `item${i+1}_role`, t.role);
});

// Location banner
c('index', 'location_banner', 'title', 'Delivering Custom Prints Across Ireland');
c('index', 'location_banner', 'desc', 'Flat rate \u20ac12.50 per box. Serving every county from Dublin to Donegal.', 'html');

// CTA
c('index', 'cta', 'title', 'Ready to Start Your Order?');
c('index', 'cta', 'desc', 'Get a free quote in minutes. Free artwork and design consultation included with every order.');

// ── PRODUCTS PAGE ──
c('products', 'hero', 'title_prefix', 'Our');
c('products', 'hero', 'title_highlight', 'Products');
c('products', 'hero', 'desc', 'Quality custom printed products for every need. From a single sample to thousands of units, every item is printed to your exact specifications with premium materials and inks.');

const productDetails = [
  { key: 'tshirts', title: 'Custom T-Shirts', desc: "Our most popular product. Choose from a huge range of styles, colours, and fits. We print on premium cotton t-shirts that feel great and look even better. Whether you need 10 tees for a stag do or 10,000 for a corporate event, our t-shirt printing delivers stunning results every time.", features: ['Premium 100% ring-spun cotton', "Men's, women's &amp; children's sizes", '50+ colours available', 'Screen print, DTF, vinyl &amp; transfer options', 'Front, back &amp; sleeve printing', 'No minimum order for DTF'], price: 'From &euro;3.95 per t-shirt (bulk orders)', cta: 'Get a T-Shirt Quote' },
  { key: 'hoodies', title: 'Hoodies &amp; Sweatshirts', desc: "Custom hoodies are the go-to choice for schools, universities, sports teams, and businesses. We print and embroider on heavyweight and midweight hoodies in zip-up and pullover styles. Perfect for Ireland's climate \u2014 your team will wear them year-round.", features: ['Heavyweight 280-320gsm cotton blend', 'Pullover &amp; zip-up styles', 'Double-lined hood with drawcord', 'Kangaroo pocket front', 'Print or embroidery options', 'Crew-neck sweatshirts also available'], price: 'From &euro;14.95 per hoodie (bulk orders)', cta: 'Get a Hoodie Quote' },
  { key: 'hats', title: 'Hats &amp; Caps', desc: "Make a statement with custom printed and embroidered headwear. From classic baseball caps to trendy bucket hats and warm beanies, our headwear range lets your brand shine from the top down. Popular with sports clubs, hospitality, and outdoor events.", features: ['Baseball caps, snapbacks &amp; truckers', 'Beanies &amp; winter hats', 'Bucket hats &amp; sun hats', 'Embroidery &amp; print options', 'Adjustable &amp; fitted sizes', "One-size &amp; children's options"], price: 'From &euro;6.95 per hat (bulk orders)', cta: 'Get a Hat Quote' },
  { key: 'mugs', title: 'Mugs &amp; Cups', desc: "Custom printed mugs are perfect for corporate gifts, cafe branding, event giveaways, and promotional campaigns. Our sublimation printing creates vibrant, dishwasher-safe prints that won't fade or peel. Every sip is a reminder of your brand.", features: ['11oz &amp; 15oz ceramic mugs', 'Travel mugs &amp; insulated cups', 'Full-wrap sublimation printing', 'Dishwasher &amp; microwave safe', 'Photo-quality full colour prints', 'Gift box packaging available'], price: 'From &euro;4.95 per mug (bulk orders)', cta: 'Get a Mug Quote' },
  { key: 'bags', title: 'Bags &amp; Totes', desc: "Eco-friendly and endlessly reusable, custom printed bags are walking billboards for your brand. From cotton tote bags to drawstring gym bags, our printed bags get your message out there. Popular for events, retail, and corporate giveaways.", features: ['Cotton &amp; canvas tote bags', 'Drawstring gym bags', 'Cooler bags &amp; shoppers', 'Eco-friendly &amp; reusable materials', 'Screen print &amp; DTF options', 'Custom sizes available'], price: 'From &euro;3.50 per bag (bulk orders)', cta: 'Get a Bag Quote' },
  { key: 'workwear', title: 'Hi-Vis &amp; Workwear', desc: "Professional branded workwear that looks smart and meets safety standards. From hi-vis vests and jackets to polo shirts and softshell jackets, we kit out trades, construction, warehousing, and hospitality teams across Ireland.", features: ['Hi-vis vests, jackets &amp; trousers', 'Polo shirts &amp; dress shirts', 'Softshell &amp; fleece jackets', 'Aprons &amp; chef wear', 'EN ISO 20471 compliant hi-vis', 'Embroidery for professional finish'], price: 'From &euro;8.95 per item (bulk orders)', cta: 'Get a Workwear Quote' },
  { key: 'jerseys', title: 'Sports Jerseys &amp; Teamwear', desc: "Custom jerseys for GAA, soccer, rugby, athletics, and every sport in between. We produce fully sublimated jerseys with unlimited colour options, or print and vinyl your existing blanks. Kit out your team from the pitch to the pub.", features: ['Full sublimation jerseys (custom design)', 'GAA, soccer, rugby &amp; basketball styles', 'Individual player names &amp; numbers', 'Moisture-wicking performance fabric', 'Matching shorts &amp; socks available', 'Sponsor logos &amp; crest printing'], price: 'From &euro;19.95 per jersey (bulk orders)', cta: 'Get a Jersey Quote' }
];
productDetails.forEach(p => {
  c('products', p.key, 'title', p.title, 'html');
  c('products', p.key, 'desc', p.desc, 'html');
  c('products', p.key, 'price', p.price, 'html');
  c('products', p.key, 'cta', p.cta);
  p.features.forEach((f, i) => {
    c('products', p.key, `feature${i+1}`, f, 'html');
  });
});

c('products', 'cta', 'title', 'Not Sure What You Need?');
c('products', 'cta', 'desc', "Tell us about your project and we'll recommend the best products and printing method for your budget.");

// ── SERVICES PAGE ──
c('services', 'hero', 'title_prefix', 'How We');
c('services', 'hero', 'title_highlight', 'Print');
c('services', 'hero', 'desc', "Six professional printing methods, each matched to your product for the best quality and value. We'll recommend the right technique for your project \u2014 just tell us what you need.");

c('services', 'process', 'label', 'Our Process');
c('services', 'process', 'title', 'How It Works');
c('services', 'process', 'desc', 'From your idea to the finished product in four simple steps.');

const processSteps = [
  { title: 'Tell Us What You Need', desc: 'Fill out our quick quote form or give us a call. Tell us the product, quantity, and any design ideas. No need for final artwork at this stage.' },
  { title: 'Free Artwork &amp; Design', desc: 'Our design team creates or refines your artwork at no extra cost. We\'ll send a digital proof for your approval before anything goes to print.' },
  { title: 'We Print Your Order', desc: 'Once you approve the proof, we get to work. We match the optimal printing method to your product and run a quality check on every item.' },
  { title: 'Delivered to Your Door', desc: 'Your order is packaged and shipped within 3-4 working days. Flat rate &euro;12.50 per box anywhere in Ireland. Collection also available.' }
];
processSteps.forEach((s, i) => {
  c('services', 'process', `step${i+1}_title`, s.title, 'html');
  c('services', 'process', `step${i+1}_desc`, s.desc, 'html');
});

c('services', 'methods', 'label', 'Printing Methods');
c('services', 'methods', 'title', 'Six Ways to Print');
c('services', 'methods', 'desc', "Each technique has its strengths. We'll help you choose the right one.");

const methods = [
  { key: 'screen', icon: '&#127912;', title: 'Screen Printing', desc: 'The industry gold standard. Water-based inks are pushed through a fine mesh screen to create vibrant, long-lasting prints. The more you order, the cheaper it gets \u2014 making screen printing ideal for bulk orders of 25 or more. Best for: bold logos, simple designs, large quantities.', best: 'T-shirts, hoodies, tote bags', min: '25 units', colors: 'Up to 6 spot colours' },
  { key: 'dtf', icon: '&#127752;', title: 'DTF (Direct-to-Film) Printing', desc: 'The newest technology in garment printing. A full-colour design is printed onto a special film and heat-pressed onto your garment. No colour limits, no minimums, photographic quality. DTF works on virtually any fabric colour including dark garments.', best: 'Complex designs, photos, small runs', min: '1 unit', colors: 'Unlimited full colour' },
  { key: 'vinyl', icon: '&#9999;&#65039;', title: 'Vinyl Printing', desc: 'Cut vinyl is heat-pressed onto garments for a bold, raised finish. Ideal for names, numbers, and simple text-based designs. Extremely durable and available in a wide range of colours including metallic, glitter, and reflective finishes.', best: 'Names &amp; numbers, sports jerseys', min: '1 unit', colors: 'Single colour per layer' },
  { key: 'transfer', icon: '&#128248;', title: 'Full-Colour Transfer', desc: "Full-colour designs are printed onto transfer paper and heat-pressed onto garments. Great for photographic images, detailed illustrations, and designs with many colours. Works well for small to medium runs where screen printing isn't cost-effective.", best: 'Photos, detailed artwork, small runs', min: '1 unit', colors: 'Unlimited full colour' },
  { key: 'sublimation', icon: '&#128167;', title: 'Sublimation Printing', desc: "Heat converts solid dye into gas which bonds with polyester fibres. The result is a print that becomes part of the fabric \u2014 it won't crack, peel, or fade. Sublimation allows edge-to-edge all-over printing and is the go-to for sportswear and mugs.", best: 'Sportswear, mugs, all-over prints', min: '1 unit', colors: 'Unlimited full colour' },
  { key: 'label', icon: '&#127991;&#65039;', title: 'Label Printing', desc: 'Add a professional touch to your custom garments with branded labels. We produce woven labels, printed satin labels, and heat transfer labels for neck, hem, and care instructions. Perfect for turning custom prints into your own clothing line.', best: 'Brand labels, clothing lines', min: '100 units', colors_label: 'Types', colors: 'Woven, satin, heat transfer' }
];
methods.forEach(m => {
  c('services', `method_${m.key}`, 'icon', m.icon, 'html');
  c('services', `method_${m.key}`, 'title', m.title, 'html');
  c('services', `method_${m.key}`, 'desc', m.desc, 'html');
  c('services', `method_${m.key}`, 'best_for', m.best, 'html');
  c('services', `method_${m.key}`, 'min_order', m.min);
  c('services', `method_${m.key}`, 'colors_label', m.colors_label || 'Colours');
  c('services', `method_${m.key}`, 'colors', m.colors, 'html');
});

c('services', 'cta', 'title', 'Not Sure Which Method?');
c('services', 'cta', 'desc', "Tell us about your project and we'll recommend the best printing technique for your product and budget.");

// ── ABOUT PAGE ──
c('about', 'hero', 'title_prefix', 'Our');
c('about', 'hero', 'title_highlight', 'Story');
c('about', 'hero', 'desc', "From a small print shop in 1994 to one of Ireland's most trusted custom printing companies. Three decades of putting your designs on products people love to wear.");

c('about', 'story', 'label', 'Est. 1994');
c('about', 'story', 'title', '30+ Years of Printing Excellence');
c('about', 'story', 'para1', 'Dublin T-Shirt Print started in 1994 with a simple mission: provide high-quality custom printed garments at fair prices, with a turnaround time that actually works for our customers.');
c('about', 'story', 'para2', 'Three decades later, that mission hasn\'t changed. We\'ve grown from t-shirts to a full range of custom printed products \u2014 hoodies, hats, mugs, bags, workwear, and sports jerseys \u2014 but our commitment to quality, speed, and value remains the same.');
c('about', 'story', 'para3', 'As an Irish-owned and operated business, we understand what our customers need. Whether it\'s a rush order for a charity event, a season\'s worth of jerseys for the local GAA club, or branded workwear for a growing business, we treat every order like it matters \u2014 because it does.');

c('about', 'timeline', 'label', 'Our Journey');
c('about', 'timeline', 'title', 'Three Decades of Growth');

const timeline = [
  { year: '1994', title: 'The Beginning', desc: 'Founded as a small screen printing operation, serving local businesses and sports clubs in the midlands.' },
  { year: '2000s', title: 'Expanding Our Range', desc: 'Added vinyl printing and full-colour transfer capabilities. Began serving customers nationwide with our Dublin delivery network.' },
  { year: '2010s', title: 'Going Digital', desc: 'Invested in sublimation technology for mugs and sportswear. Launched online ordering and expanded our product range to include workwear and accessories.' },
  { year: '2020s', title: 'DTF &amp; Beyond', desc: 'Adopted DTF (Direct-to-Film) printing technology for unlimited colour, no-minimum orders. Now serving thousands of customers across Ireland with six printing methods.' }
];
timeline.forEach((t, i) => {
  c('about', 'timeline', `item${i+1}_year`, t.year);
  c('about', 'timeline', `item${i+1}_title`, t.title, 'html');
  c('about', 'timeline', `item${i+1}_desc`, t.desc, 'html');
});

c('about', 'values', 'label', 'Our Values');
c('about', 'values', 'title', 'What Sets Us Apart');

const values = [
  { title: 'Quality First', desc: 'Every item is quality-checked before it leaves our workshop. We use premium inks, garments, and techniques to ensure your prints look great and last.' },
  { title: 'Speed That Delivers', desc: 'Our 3-4 day turnaround is one of the fastest in Ireland. When you need it fast, we deliver \u2014 without cutting corners on quality.' },
  { title: 'Fair Pricing', desc: "No hidden fees, no surprise charges. Free artwork, free design consultation, and big savings on bulk orders. We believe quality printing shouldn't cost a fortune." },
  { title: 'Personal Service', desc: "We're real people, not a faceless corporation. Call us, WhatsApp us, email us \u2014 you'll always talk to someone who knows your order." },
  { title: 'Irish-Owned', desc: 'Proudly Irish-owned and operated since 1994. Your money supports a local business and keeps printing jobs in Ireland.' },
  { title: 'Eco-Conscious', desc: 'We use water-based inks wherever possible, offer organic cotton options, and minimise waste throughout our production process.' }
];
values.forEach((v, i) => {
  c('about', 'values', `item${i+1}_title`, v.title);
  c('about', 'values', `item${i+1}_desc`, v.desc);
});

c('about', 'cta', 'title', "Let's Work Together");
c('about', 'cta', 'desc', '30+ years of experience at your service. Tell us what you need and we\'ll make it happen.');

// ── CONTACT PAGE ──
c('contact', 'hero', 'title_prefix', 'Get In');
c('contact', 'hero', 'title_highlight', 'Touch');
c('contact', 'hero', 'desc', "Have a question about our products or need a quote? We're here 7 days a week and happy to help. Call, email, WhatsApp, or fill out the form below.");
c('contact', 'form', 'title', 'Send Us a Message');
c('contact', 'map', 'title', 'Find Us');

// ── QUOTE PAGE ──
c('quote', 'hero', 'title_prefix', 'Get a Free');
c('quote', 'hero', 'title_highlight', 'Quote');
c('quote', 'hero', 'desc', "Fill out the form below and we'll get back to you within hours with a detailed quote. Free artwork and design consultation included with every order.");
c('quote', 'sidebar', 'title', 'What Happens Next?');
c('quote', 'sidebar', 'step1_title', 'We Review Your Request');
c('quote', 'sidebar', 'step1_desc', "We'll review your requirements and put together a detailed quote within hours.");
c('quote', 'sidebar', 'step2_title', 'Free Artwork &amp; Proof', 'html');
c('quote', 'sidebar', 'step2_desc', 'Our design team creates your artwork and sends a digital proof for approval.');
c('quote', 'sidebar', 'step3_title', 'Production &amp; Delivery', 'html');
c('quote', 'sidebar', 'step3_desc', 'Once approved, your order is printed and delivered within 3-4 working days.');
c('quote', 'sidebar', 'prefer_title', 'Prefer to Talk?');
c('quote', 'sidebar', 'prefer_desc', 'Call or WhatsApp us for an instant quote.');
c('quote', 'form', 'response_time', 'We typically respond within 2-4 hours during business hours.');

// ── LOCATION PAGES (Dublin as template, others follow same pattern) ──
const locationData = [
  {
    city: 'dublin', name: 'Dublin',
    hero_desc: "Dublin's trusted source for custom printed t-shirts, hoodies, hats, mugs, and workwear. Serving businesses, clubs, schools, and events across Dublin city and county for over 30 years. Fast delivery direct to your Dublin address.",
    feature1_title: 'Fast Dublin Delivery', feature1_desc: 'Your custom printed products delivered to any Dublin address within 3-4 working days. Flat rate &euro;12.50 per box &mdash; whether you\'re in Dublin 1 or Dublin 24. Collection also available.',
    feature2_title: 'Free Artwork &amp; Design', feature2_desc: 'Our design team creates or refines your artwork at no cost. Send us a rough sketch, a logo file, or just an idea &mdash; we\'ll turn it into a print-ready design and send a proof before printing.',
    feature3_title: "Dublin's Best Value", feature3_desc: 'Custom t-shirts from just &euro;3.95 per item on bulk orders. No setup fees, no hidden charges. Free artwork included. The more you order, the more you save.',
    products_desc: 'Every product custom printed and delivered to Dublin. From corporate offices on Baggot Street to GAA clubs in Ballymun.',
    body_p1: "Dublin is the heart of Ireland's business and culture, and custom printed apparel plays a vital role in how Dublin's organisations present themselves. From tech startups in the Silicon Docks to traditional pubs on Camden Street, from Dublin GAA clubs to Trinity College societies \u2014 we've printed for them all.",
    body_p2: "Our custom t-shirt printing Dublin service is designed for speed and convenience. Tell us what you need, approve the free artwork proof, and we'll have your order printed and on its way to Dublin within days. Whether you need 10 stag party t-shirts for Temple Bar or 5,000 branded polos for a Croke Park event, we deliver.",
    body_p3: "We serve all Dublin areas including Dublin 1-24, Swords, Malahide, Howth, Dun Laoghaire, Tallaght, Blanchardstown, Lucan, Clondalkin, and all surrounding areas. Flat rate delivery means the same price whether you're in the city centre or the suburbs.",
    popular_orders: [
      { title: 'Corporate Events &amp; Launches', desc: 'Branded t-shirts, hoodies &amp; bags for Dublin conferences, launches, and team events.' },
      { title: 'Dublin GAA &amp; Sports Clubs', desc: 'Custom jerseys, training tops &amp; supporter gear for clubs across Dublin city and county.' },
      { title: 'Stag &amp; Hen Parties', desc: 'Matching group tees for nights out in Temple Bar, Harcourt Street &amp; beyond.' },
      { title: 'University Societies &amp; RAG Week', desc: 'Class hoodies, society merch &amp; event tees for TCD, UCD, DCU &amp; TU Dublin students.' },
      { title: 'Dublin Pubs &amp; Restaurants', desc: 'Staff uniforms, branded aprons &amp; promotional merchandise for Dublin hospitality.' }
    ],
    faqs: [
      { q: 'How quickly can you deliver to Dublin?', a: 'We deliver to all Dublin addresses within 3-4 working days from order approval. For urgent orders, contact us directly and we\'ll do our best to accommodate rush delivery to Dublin.' },
      { q: "What's the delivery cost to Dublin?", a: 'Flat rate &euro;12.50 per box anywhere in Dublin &mdash; whether you\'re in Dublin 1 or Swords. No distance surcharges. Collection from our facility is also available.' },
      { q: 'Is there a minimum order for Dublin customers?', a: "For DTF printing, there's no minimum &mdash; we can print from just 1 unit. Screen printing is most cost-effective for orders of 25+. Contact us for the best option for your quantity." },
      { q: 'Can I collect my order in person?', a: "Yes! You're welcome to collect from our facility. We'll let you know when your order is ready and arrange a convenient collection time." },
      { q: 'Do you have a Dublin showroom?', a: 'Our production facility is based in the midlands, which allows us to offer better prices than Dublin-based printers. We deliver to Dublin addresses within 3-4 days at a flat &euro;12.50 per box.' }
    ],
    cta_title: 'Ready to Order in Dublin?',
    cta_desc: 'Get a free quote for custom printed products delivered anywhere in Dublin.'
  },
  {
    city: 'cork', name: 'Cork',
    hero_desc: "Cork's trusted source for custom printed t-shirts, hoodies, hats, mugs, and workwear. Serving businesses, clubs, schools, and events across Cork city and county. Fast nationwide delivery.",
    feature1_title: 'Fast Cork Delivery', feature1_desc: 'Your custom printed products delivered to any Cork address within 3-4 working days. Flat rate &euro;12.50 per box anywhere in Cork city or county.',
    feature2_title: 'Free Artwork &amp; Design', feature2_desc: 'Our design team creates or refines your artwork at no cost. Send us a rough sketch, a logo file, or just an idea &mdash; we\'ll handle the rest.',
    feature3_title: "Cork's Best Value", feature3_desc: 'Custom t-shirts from just &euro;3.95 per item on bulk orders. No setup fees, no hidden charges. Free artwork included.',
    products_desc: 'Every product custom printed and delivered to Cork. From offices on Patrick Street to GAA clubs in Ballincollig.',
    body_p1: "Cork is Ireland's second city and a hub of business, sport, and culture. Custom printed apparel is essential for Cork's thriving business community, sports clubs, and event organisers.",
    body_p2: "Our custom t-shirt printing Cork service delivers the same quality and speed as our Dublin service. Tell us what you need and we'll have it on its way to Cork within days.",
    body_p3: 'We serve all Cork areas including Cork city centre, Douglas, Ballincollig, Carrigaline, Cobh, Midleton, Mallow, and all surrounding areas.',
    popular_orders: [
      { title: 'Cork Business &amp; Corporate', desc: 'Branded uniforms, promotional merchandise, and corporate gifts for Cork businesses.' },
      { title: 'Cork GAA &amp; Sports Clubs', desc: 'Custom jerseys, training tops &amp; supporter gear for clubs across Cork.' },
      { title: 'Stag &amp; Hen Parties', desc: 'Custom party t-shirts for nights out on Oliver Plunkett Street &amp; beyond.' },
      { title: 'UCC &amp; MTU Students', desc: 'Class hoodies, society merch &amp; event tees for Cork\'s university students.' },
      { title: 'Cork Festivals &amp; Events', desc: 'Event merchandise, staff uniforms &amp; branded gear for Cork\'s busy events calendar.' }
    ],
    faqs: [
      { q: 'How quickly can you deliver to Cork?', a: 'We deliver to all Cork addresses within 3-4 working days from order approval.' },
      { q: "What's the delivery cost to Cork?", a: 'Flat rate &euro;12.50 per box anywhere in Cork.' },
      { q: 'Is there a minimum order?', a: "For DTF printing, there's no minimum. Screen printing is most cost-effective for orders of 25+." },
      { q: 'Can I collect my order?', a: 'Collection from our facility is available. We\'ll arrange a convenient time.' },
      { q: 'Do you have a Cork showroom?', a: 'Our production facility is centrally located in Ireland, allowing us to offer competitive prices with fast delivery to Cork.' }
    ],
    cta_title: 'Ready to Order in Cork?',
    cta_desc: 'Get a free quote for custom printed products delivered anywhere in Cork.'
  },
  {
    city: 'galway', name: 'Galway',
    hero_desc: "Galway's trusted source for custom printed t-shirts, hoodies, hats, mugs, and workwear. Serving the west of Ireland's businesses, clubs, and events. Fast nationwide delivery.",
    feature1_title: 'Fast Galway Delivery', feature1_desc: 'Your custom printed products delivered to any Galway address within 3-4 working days. Flat rate &euro;12.50 per box.',
    feature2_title: 'Free Artwork &amp; Design', feature2_desc: 'Our design team creates or refines your artwork at no cost. Send us your idea and we\'ll make it print-ready.',
    feature3_title: "Galway's Best Value", feature3_desc: 'Custom t-shirts from just &euro;3.95 per item on bulk orders. No setup fees, free artwork included.',
    products_desc: 'Every product custom printed and delivered to Galway. From Shop Street businesses to Salthill sports clubs.',
    body_p1: "Galway is Ireland's cultural capital, known for its vibrant arts scene, festivals, and sporting community. Custom printed apparel is a staple for Galway's many events, businesses, and clubs.",
    body_p2: "Whether you need branded merchandise for the Galway Races, jerseys for a local hurling club, or staff uniforms for a Quay Street restaurant, we deliver quality prints to Galway fast.",
    body_p3: 'We serve all Galway areas including Galway city, Salthill, Oranmore, Athenry, Tuam, Loughrea, and all surrounding areas.',
    popular_orders: [
      { title: 'Galway Business &amp; Tourism', desc: 'Branded merchandise for Galway\'s tourism and hospitality sector.' },
      { title: 'Galway GAA &amp; Sports Clubs', desc: 'Custom jerseys and training gear for clubs across Galway.' },
      { title: 'Galway Races &amp; Festivals', desc: 'Event merchandise and branded gear for Galway\'s famous events.' },
      { title: 'NUI Galway Students', desc: 'Class hoodies, society merch &amp; event tees for university students.' },
      { title: 'Galway Restaurants &amp; Pubs', desc: 'Staff uniforms and branded merchandise for Galway hospitality.' }
    ],
    faqs: [
      { q: 'How quickly can you deliver to Galway?', a: 'We deliver to all Galway addresses within 3-4 working days from order approval.' },
      { q: "What's the delivery cost to Galway?", a: 'Flat rate &euro;12.50 per box anywhere in Galway.' },
      { q: 'Is there a minimum order?', a: "For DTF printing, there's no minimum. Screen printing works best for orders of 25+." },
      { q: 'Can I collect my order?', a: 'Collection from our facility is available. We\'ll arrange a convenient time.' },
      { q: 'Do you serve all of County Galway?', a: 'Yes, we deliver to all addresses in Galway city and county at the same flat rate.' }
    ],
    cta_title: 'Ready to Order in Galway?',
    cta_desc: 'Get a free quote for custom printed products delivered anywhere in Galway.'
  },
  {
    city: 'limerick', name: 'Limerick',
    hero_desc: "Limerick's trusted source for custom printed t-shirts, hoodies, hats, mugs, and workwear. Serving the mid-west's businesses, clubs, and events. Fast nationwide delivery.",
    feature1_title: 'Fast Limerick Delivery', feature1_desc: 'Your custom printed products delivered to any Limerick address within 3-4 working days. Flat rate &euro;12.50 per box.',
    feature2_title: 'Free Artwork &amp; Design', feature2_desc: 'Our design team creates or refines your artwork at no cost. Send us your idea and we\'ll make it print-ready.',
    feature3_title: "Limerick's Best Value", feature3_desc: 'Custom t-shirts from just &euro;3.95 per item on bulk orders. No setup fees, free artwork included.',
    products_desc: 'Every product custom printed and delivered to Limerick. From O\'Connell Street offices to Thomond Park sports clubs.',
    body_p1: "Limerick is a city with a proud sporting tradition and a growing business community. Custom printed apparel plays a key role in how Limerick's organisations and teams present themselves.",
    body_p2: "From Munster Rugby supporter gear to corporate uniforms for the Limerick business district, we deliver quality custom prints to Limerick fast.",
    body_p3: 'We serve all Limerick areas including Limerick city, Castletroy, Raheen, Dooradoyle, Annacotty, and all surrounding areas.',
    popular_orders: [
      { title: 'Limerick Business &amp; Corporate', desc: 'Branded uniforms and promotional merchandise for Limerick businesses.' },
      { title: 'Limerick Rugby &amp; Sports Clubs', desc: 'Custom jerseys and training gear for Limerick\'s famous rugby and GAA clubs.' },
      { title: 'Stag &amp; Hen Parties', desc: 'Custom party t-shirts for nights out in Limerick city.' },
      { title: 'UL &amp; TUS Students', desc: 'Class hoodies, society merch &amp; event tees for Limerick students.' },
      { title: 'Limerick Events &amp; Festivals', desc: 'Event merchandise and branded gear for Limerick events.' }
    ],
    faqs: [
      { q: 'How quickly can you deliver to Limerick?', a: 'We deliver to all Limerick addresses within 3-4 working days from order approval.' },
      { q: "What's the delivery cost to Limerick?", a: 'Flat rate &euro;12.50 per box anywhere in Limerick.' },
      { q: 'Is there a minimum order?', a: "For DTF printing, there's no minimum. Screen printing works best for 25+ units." },
      { q: 'Can I collect my order?', a: 'Collection from our facility is available.' },
      { q: 'Do you serve all of County Limerick?', a: 'Yes, we deliver to all addresses in Limerick city and county at the same flat rate.' }
    ],
    cta_title: 'Ready to Order in Limerick?',
    cta_desc: 'Get a free quote for custom printed products delivered anywhere in Limerick.'
  },
  {
    city: 'waterford', name: 'Waterford',
    hero_desc: "Waterford's trusted source for custom printed t-shirts, hoodies, hats, mugs, and workwear. Serving the south-east's businesses, clubs, and events. Fast nationwide delivery.",
    feature1_title: 'Fast Waterford Delivery', feature1_desc: 'Your custom printed products delivered to any Waterford address within 3-4 working days. Flat rate &euro;12.50 per box.',
    feature2_title: 'Free Artwork &amp; Design', feature2_desc: 'Our design team creates or refines your artwork at no cost. Send us your idea and we\'ll make it print-ready.',
    feature3_title: "Waterford's Best Value", feature3_desc: 'Custom t-shirts from just &euro;3.95 per item on bulk orders. No setup fees, free artwork included.',
    products_desc: 'Every product custom printed and delivered to Waterford. From the Viking Triangle to WIT sports clubs.',
    body_p1: "Waterford, Ireland's oldest city, has a thriving business and sporting community. Custom printed apparel is essential for Waterford's many organisations, teams, and events.",
    body_p2: "Whether you need branded merchandise for Spraoi Festival, jerseys for a local hurling club, or staff uniforms for a Waterford restaurant, we deliver quality prints fast.",
    body_p3: 'We serve all Waterford areas including Waterford city, Tramore, Dungarvan, Dunmore East, and all surrounding areas.',
    popular_orders: [
      { title: 'Waterford Business &amp; Corporate', desc: 'Branded uniforms and promotional merchandise for Waterford businesses.' },
      { title: 'Waterford GAA &amp; Sports Clubs', desc: 'Custom jerseys and training gear for Waterford\'s GAA and sports clubs.' },
      { title: 'Stag &amp; Hen Parties', desc: 'Custom party t-shirts for celebrations in Waterford.' },
      { title: 'SETU Students', desc: 'Class hoodies, society merch &amp; event tees for Waterford students.' },
      { title: 'Waterford Events &amp; Festivals', desc: 'Event merchandise for Spraoi and other Waterford events.' }
    ],
    faqs: [
      { q: 'How quickly can you deliver to Waterford?', a: 'We deliver to all Waterford addresses within 3-4 working days from order approval.' },
      { q: "What's the delivery cost to Waterford?", a: 'Flat rate &euro;12.50 per box anywhere in Waterford.' },
      { q: 'Is there a minimum order?', a: "For DTF printing, there's no minimum. Screen printing works best for 25+ units." },
      { q: 'Can I collect my order?', a: 'Collection from our facility is available.' },
      { q: 'Do you serve all of County Waterford?', a: 'Yes, we deliver to all addresses in Waterford city and county at the same flat rate.' }
    ],
    cta_title: 'Ready to Order in Waterford?',
    cta_desc: 'Get a free quote for custom printed products delivered anywhere in Waterford.'
  }
];

for (const loc of locationData) {
  const page = `locations/${loc.city}`;
  c(page, 'hero', 'city_name', loc.name);
  c(page, 'hero', 'desc', loc.hero_desc, 'html');
  c(page, 'features', 'item1_icon', '&#128666;', 'html');
  c(page, 'features', 'item1_title', loc.feature1_title, 'html');
  c(page, 'features', 'item1_desc', loc.feature1_desc, 'html');
  c(page, 'features', 'item2_icon', '&#127912;', 'html');
  c(page, 'features', 'item2_title', loc.feature2_title, 'html');
  c(page, 'features', 'item2_desc', loc.feature2_desc, 'html');
  c(page, 'features', 'item3_icon', '&#128176;', 'html');
  c(page, 'features', 'item3_title', loc.feature3_title, 'html');
  c(page, 'features', 'item3_desc', loc.feature3_desc, 'html');
  c(page, 'products', 'label', `${loc.name} Products`);
  c(page, 'products', 'title', `Custom Printed Products for ${loc.name}`);
  c(page, 'products', 'desc', loc.products_desc, 'html');
  c(page, 'body', 'title', `Custom Printing for ${loc.name}'s Businesses &amp; Communities`, 'html');
  c(page, 'body', 'para1', loc.body_p1);
  c(page, 'body', 'para2', loc.body_p2);
  c(page, 'body', 'para3', loc.body_p3);
  c(page, 'popular', 'title', `Popular ${loc.name} Orders`);
  loc.popular_orders.forEach((o, i) => {
    c(page, 'popular', `item${i+1}_title`, o.title, 'html');
    c(page, 'popular', `item${i+1}_desc`, o.desc, 'html');
  });
  loc.faqs.forEach((f, i) => {
    c(page, 'faq', `item${i+1}_question`, f.q, 'html');
    c(page, 'faq', `item${i+1}_answer`, f.a, 'html');
  });
  c(page, 'cta', 'title', loc.cta_title);
  c(page, 'cta', 'desc', loc.cta_desc);
}

console.log('  Content blocks seeded');
console.log('Database seeded successfully!');
