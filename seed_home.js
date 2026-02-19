const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const connectDB = require('./config/db');

dotenv.config();

const homePageData = {
  slug: 'home',
  title: 'Home Page',
  sections: [
    // ============================================
    // Section 1: HERO SECTION
    // ============================================
    // Editable in CMS: Image, Heading, Subheading, CTA
    {
      type: 'hero',
      heading: 'VERDE NYC',
      subheading: 'MediterrAsian Rooftop Restaurant & Lounge',
      ctaText: 'RESERVE YOUR TABLE',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg'],
      order: 1
    },
    
    // ============================================
    // Section 2: VENUE GRID (Features)
    // ============================================
    // Editable in CMS: Heading, Subheading, Content, Background texture
    // ⚠️ VENUE CARDS: Edit 'items' array below to add/modify venues
    // 
    // CMS FORMATTING INSTRUCTIONS:
    // In Content field, enter each paragraph on a NEW LINE (press Enter after each)
    // Last line will automatically be italic
    {
      type: 'features',
      heading: 'WHERE PARISIAN CRAFT MEETS NEW YORK SOUL',
      subheading: 'A YEEELS GROUP DESTINATION — PARIS | SAINT-TROPEZ | DUBAI | SARDINIA | NEW YORK',
      content: `Verde NYC is the latest jewel in the Yeeels Group crown—an international hospitality collective celebrated for curating unforgettable culinary destinations across Europe, the Middle East, and now, in the heart of Manhattan.

Verde brings Parisian soul to New York's vibrant streets. Here, French culinary tradition is reimagined with contemporary elegance—each dish reflects precision, passion, and the art of celebration.

Step into a world of intimate charm and metropolitan energy, where every moment is crafted for connection and savor. From thoughtfully designed tasting journeys to vibrant lounge evenings and exclusive dining experiences, Verde invites you to dine beyond the expected.

Paris on the plate. New York in the room`,
      images: ['/mila-miami-texture.png'], // Background texture
      // 🏢 VENUE CARDS - Modify these to change venue grid
      items: [
        {
          name: 'VERDE RESTAURANT',
          description: 'The distinctively curated rooftop aims to take guests on a culinary journey through the shores of the Mediterranean.',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg',
          link: '/restaurant'
        },
        {
          name: "VERDE PARTY'S",
          description: "Experience world-class hospitality at VERDYPARTY'S, where bespoke private events come to life. Whether an intimate gathering or a grand celebration for up to 400 guests, each occasion is infused with timeless Mediterranean elegance and meticulous attention to detail.",
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork.jpg',
          link: '/dinner-party'
        },
        {
          name: 'VERDE Lounge',
          description: 'At VERDE lounge, intimate charm blends seamlessly with metropolitan energy. Designed for vibrant lounge evenings and thoughtfully curated experiences, this space captures the essence of Parisian artistry and the spirited soul of New York',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg-750x750.jpg',
          link: '/milalounge'
        },
        {
          name: 'VERDE BAR',
          description: 'VERDYBAR redefines Sunday Brunch. Join us on our rooftop for a festive experience featuring live music, exquisite Mediterranean fare from chef-designed stations, and an atmosphere dedicated to leisure and lively connection',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg.jpg',
          link: '/bar'
        }
      ],
      order: 2
    },
    
    // ============================================
    // Section 3: PARALLAX 1 - "Inspired by nature"
    // ============================================
    // Editable in CMS: Image, Heading, Content
    {
      type: 'parallax',
      heading: 'Inspired by nature',
      content: 'Born in Paris. Celebrated in Saint-Tropez. Elevated in Dubai. Now, Verde arrives in New York—bringing two decades of Mediterranean excellence to the Meatpacking District.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8419.jpg'],
      order: 3
    },
    
    // ============================================
    // Section 4: PHILOSOPHY - Reserve Experience
    // ============================================
    // Editable in CMS: Heading, Content, CTA
    {
      type: 'text',
      heading: 'A Global Legacy of Culinary Excellence',
      content: 'The Yeeels Group has spent over a decade perfecting the art of festive dining across Europe and the Middle East. From the sophisticated elegance of Verde Paris on Avenue George V to the sun-drenched glamour of our Saint-Tropez beach club, from the cosmopolitan energy of Verde Dubai to the timeless charm of our Italian venues—each destination embodies our commitment to exceptional experiences. Now, Verde NYC brings this celebrated legacy to America\'s most dynamic city. In the heart of the Meatpacking District, discover a sanctuary where Mediterranean cuisine, innovative mixology, and world-class entertainment converge to create moments that transcend the ordinary.',
      ctaText: 'RESERVE YOUR EXPERIENCE',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      images: [], // No image, just colored background
      order: 4
    },
    
    // ============================================
    // Section 5: PARALLAX 2 - "Art of Festive Dining"
    // ============================================
    // Editable in CMS: Image, Heading, Content
    {
      type: 'parallax',
      heading: 'The Art of Festive Dining',
      content: 'At the heart of the Yeeels Group philosophy lies a simple yet profound belief: dining should be transformative. From our flagship venues in Paris to the shores of the French Riviera, from the glittering skyline of Dubai to the vibrant energy of Manhattan, we create spaces where gastronomy becomes theatre, where every evening unfolds as a unique celebration. Verde NYC continues this tradition, offering an immersive experience where Mediterranean sophistication meets New York\'s electric energy. Here, exceptional cuisine, innovative cocktails, and curated entertainment converge to create memories that linger long after the evening ends.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8490.jpg'],
      order: 5
    },
    
    // ============================================
    // Section 6: PHILOSOPHY DETAIL
    // ============================================
    // Editable in CMS: Heading only
    // ⚠️ TEXT PARTS: Edit 'items' array below for philosophy & art culture text
    {
      type: 'philosophy',
      heading: 'Our Philosophy',
      images: [
        '', // Background texture - Upload via CMS
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8425.jpg' // Art & Culture image
      ],
      // 🎨 PHILOSOPHY CONTENT - Modify these text parts
      items: [
        {
          name: 'Philosophy Part 1',
          description: 'The Yeeels Group was founded on a singular vision: to become the global leader in high-end festive dining. This vision has guided our expansion from Paris to Saint-Tropez, Dubai to New York, always with the same unwavering commitment to excellence. At Verde NYC, this philosophy manifests in every detail—from the carefully sourced Mediterranean ingredients to the bespoke interior design that blends reclaimed woods, natural stone, and artisanal textiles imported from our European ateliers.'
        },
        {
          name: 'Philosophy Part 2',
          description: 'Our three pillars—Food, Tribe, and Stories—define everything we do. Creative and passionate cuisine designed for sharing. A culture of collaboration, respect, and operational excellence. High-energy, immersive experiences that transform dining into celebration. These values have made us leaders across four countries and nine venues, and they now come to life in the heart of Manhattan\'s Meatpacking District.'
        },
        {
          name: 'Art & Culture Title',
          description: 'ART & Culture'
        },
        {
          name: 'Art & Culture Part 1',
          description: 'The Yeeels Group has always believed that exceptional dining spaces require exceptional artistry. Across our venues in France, Italy, UAE, and the United States, we collaborate with visionary artists, sculptors, ceramists, and designers to create environments that inspire and transport.'
        },
        {
          name: 'Art & Culture Part 2',
          description: 'At Verde NYC, Japanese Wabi-Sabi philosophy meets Mediterranean warmth—celebrating the beauty of imperfection and the integrity of natural materials. Hand-selected artworks, bespoke installations, and carefully curated design elements create a sanctuary where every corner tells a story, every surface invites touch, and every moment becomes a memory.'
        },
        {
          name: 'Art & Culture Part 3',
          description: 'For collaboration inquiries, contact us at pr@yeeels.com'
        }
      ],
      ctaText: 'CONTACT US',
      ctaLink: '/contact',
      order: 6
    },
    
    // ============================================
    // Section 7: INSTAGRAM GALLERY
    // ============================================
    // Editable in CMS: Heading, Subheading, CTA Link
    // ⚠️ IMAGES: Edit 'images' array below to change gallery photos
    {
      type: 'gallery',
      heading: 'FOLLOW US ON INSTAGRAM',
      subheading: '@VERDE_NYC',
      ctaLink: 'https://www.instagram.com/verde_nyc?igsh=MXdlN2R5NmUxdXRiaQ==',
      // 📸 INSTAGRAM IMAGES - Update these URLs to change photos
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4610-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4697-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4726-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4761-verde-newyork-750x750.jpg'
      ],
      order: 7
    }
  ]
};

const seedHomePage = async () => {
  try {
    await connectDB();
    
    // Delete existing home page
    await Page.deleteOne({ slug: 'home' });
    console.log('Deleted existing home page');
    
    // Create new home page
    const page = await Page.create(homePageData);
    console.log('✅ Home page seeded successfully!');
    console.log(`Created page: ${page.title} (${page.slug})`);
    console.log(`Total sections: ${page.sections.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding home page:', error);
    process.exit(1);
  }
};

seedHomePage();
