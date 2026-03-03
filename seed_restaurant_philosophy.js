require('dotenv').config();
const connectDB = require('./config/db');
const Page = require('./models/Page');

async function run() {
  await connectDB();
  const page = await Page.findOne({ slug: 'restaurant' });
  if (!page) { console.log('Page not found'); process.exit(); }

  // Check if philosophy section already exists
  const exists = page.sections.find(s => s.type === 'philosophy');
  if (exists) { console.log('Philosophy section already exists'); process.exit(); }

  // Add philosophy section with the current hardcoded content
  page.sections.push({
    type: 'philosophy',
    heading: '',
    subheading: '',
    content: `From the glamorous avenues of Paris to the sun-kissed shores of Saint-Tropez, from the sophisticated skyline of Dubai to the vibrant pulse of Manhattan—the Yeeels Group has redefined festive dining across four continents. At Verde NYC, this legacy of excellence finds its newest expression in an unforgettable culinary journey through Mediterranean and Asian flavors.\n\nOur award-winning culinary team sources the finest ingredients from trusted purveyors across the globe—line-caught fish from Japanese waters, premium wagyu from Kagoshima Prefecture, seasonal vegetables from local farms, and artisanal products from the Mediterranean coast. Each dish is a masterpiece of technique and creativity, honoring tradition while embracing innovation.\n\nWhether you join us for an intimate lunch overlooking the Meatpacking District or an electrifying evening of dining and entertainment, Verde NYC transforms every meal into a celebration. Dishes are designed for sharing, encouraging connection and conversation in an atmosphere that evolves from refined sophistication to vibrant festivity as the night unfolds.`,
    ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
    ctaText: 'RESERVE YOUR TABLE',
    order: 2,
  });

  page.markModified('sections');
  await page.save();
  console.log('Philosophy section added to restaurant page!');
  process.exit();
}

run();
