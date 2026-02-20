const mongoose = require('mongoose');
require('dotenv').config();

const Page = require('./models/Page');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const seedBarPage = async () => {
  await connectDB();

  const barPageData = {
    slug: 'bar',
    title: 'Bar - Verde NYC',
    sections: [
      // Order 1: Hero Banner
      {
        type: 'hero',
        heading: 'Verde NYC brunch',
        images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8503.jpg'],
        order: 1
      },
      // Order 2: Gallery Slider
      {
        type: 'gallery',
        images: [
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8504.jpg',
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8506.jpg',
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8507.jpg',
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8510.jpg',
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8511.jpg',
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8513.jpg',
          'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8514.jpg'
        ],
        order: 2
      },
      // Order 3: Brunch Intro
      {
        type: 'text',
        heading: 'The Yeeels Group Sunday brunch experience',
        content: 'From Saint-Tropez beach clubs to Parisian terraces, Sunday at the Yeeels Group has always been sacred. At Verde NYC, we bring this celebrated tradition to New York—a midday celebration where Mediterranean elegance meets Manhattan sophistication. From noon to 5pm in the sun-drenched splendor of our Meatpacking District rooftop, indulge in a transportive experience brought to life with live music, curated cocktails, and the festive energy that has made Yeeels Group brunches legendary across Europe and the Middle East.',
        order: 3
      },
      // Order 4: Buffet Image Card
      {
        type: 'text',
        heading: 'Chef-curated Mediterranean stations',
        content: 'Inspired by the legendary brunch formats at our Saint-Tropez and Dubai venues, guests journey through artfully designed stations curated by chefs trained across our global kitchens. Each stop offers a distinct gastronomic chapter—compose your own Mediterranean narrative over a leisurely two-hour experience.',
        images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8515.jpg'],
        order: 4
      },
      // Order 5: Description Text
      {
        type: 'text',
        content: 'Your journey begins with an exquisite bakery selection featuring freshly baked croissants from recipes perfected in our Parisian kitchens, alongside seasonal fruits sourced from Mediterranean growers and Hudson Valley farms. Continue to an artful display of Italian cured meats, French artisanal cheeses, and handcrafted breads from our in-house boulangerie.\n\nAt the heart of the experience, our 5J Jamón Ibérico carving station—a tradition from our Spanish-influenced Dubai venue—offers premium cuts carved to perfection. Explore curated salads and a vibrant Sushi and Temaki Handroll Station showcasing fish flown daily from Japan. The Raw Bar features freshly shucked oysters from both coasts, while our Mezze station highlights Verde\'s signature eggplant caviar and Mediterranean spreads. On our celebrated rooftop terrace, a live Robata grill and dedicated Spritz station channel the aperitivo culture of our Italian venues.\n\nThe experience concludes with an indulgent dessert display featuring creations from our pastry team trained in Paris, capped by a Gelato Station offering flavors inspired by each of our global destinations.',
        order: 5
      },
      // Order 6: Cocktail Image Card
      {
        type: 'text',
        heading: 'International beverage program',
        content: 'Our beverage packages reflect the Yeeels Group\'s expertise cultivated across Paris, Saint-Tropez, Dubai, and Italy:\n\nA thoughtfully crafted non-alcoholic program featuring mocktails developed by our international mixology team, alongside Champagne and Rosé packages showcasing selections from our French suppliers—including houses that have partnered with us since our earliest Parisian days.',
        images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8519.jpg'],
        order: 6
      },
      // Order 7: Hours & Location
      {
        type: 'text',
        heading: 'Hours & location',
        content: 'Sunday | Noon - 5:00 PM\n\nGet Directions — 85 10th Avenue, Meatpacking District, New York City\n\nPart of the Yeeels Group: Paris | Saint-Tropez | Dubai | Italy | New York',
        ctaLink: 'https://maps.app.goo.gl/fqeZH3QPWLxBZFXY7',
        ctaText: 'Get Directions',
        order: 7
      },
      // Order 8: Reservation CTA
      {
        type: 'text',
        ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
        ctaText: 'Reserve Your Experience',
        order: 8
      },
      // Order 9: Menu CTA
      {
        type: 'text',
        heading: 'Sunday brunch menu',
        ctaLink: '/restaurant',
        ctaText: 'Explore Our Menus',
        order: 9
      }
    ]
  };

  try {
    await Page.findOneAndUpdate(
      { slug: 'bar' },
      barPageData,
      { upsert: true, new: true }
    );
    console.log('✓ Bar page seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding bar page:', error);
    process.exit(1);
  }
};

seedBarPage();
