/**
 * MASTER SEEDER - Seeds all pages at once
 * Run: node seed_all.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const Admin = require('./models/Admin');

dotenv.config();

// ============================================
// DATABASE CONNECTION
// ============================================
const connectDB = async () => {
    try {
        const isDocDB = process.env.DOCDB_TLS === 'true';
        const uri = !isDocDB && process.env.LOCAL_MONGO_URI
            ? process.env.LOCAL_MONGO_URI
            : process.env.MONGO_URI;

        const opts = isDocDB
            ? {
                retryWrites: false,
                serverSelectionTimeoutMS: 10000,
                authMechanism: 'SCRAM-SHA-1',
                authSource: 'admin',
                tls: true,
                tlsCAFile: './global-bundle.pem',
                tlsAllowInvalidCertificates: false,
              }
            : { serverSelectionTimeoutMS: 10000 };

        const conn = await mongoose.connect(uri, opts);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

// ============================================
// PAGE DATA
// ============================================

// HOME PAGE
const homePageData = {
  slug: 'home',
  title: 'Home Page',
  sections: [
    {
      type: 'hero',
      heading: 'VERDE NYC',
      subheading: 'MediterrAsian Rooftop Restaurant & Lounge',
      ctaText: 'RESERVE YOUR TABLE',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg'],
      order: 1
    },
    {
      type: 'features',
      heading: 'WHERE PARISIAN CRAFT MEETS NEW YORK SOUL',
      subheading: 'A YEEELS GROUP DESTINATION — PARIS | SAINT-TROPEZ | DUBAI | SARDINIA | NEW YORK',
      content: `Verde NYC is the latest jewel in the Yeeels Group crown—an international hospitality collective celebrated for curating unforgettable culinary destinations across Europe, the Middle East, and now, in the heart of Manhattan.

Verde brings Parisian soul to New York's vibrant streets. Here, French culinary tradition is reimagined with contemporary elegance—each dish reflects precision, passion, and the art of celebration.

Step into a world of intimate charm and metropolitan energy, where every moment is crafted for connection and savor. From thoughtfully designed tasting journeys to vibrant lounge evenings and exclusive dining experiences, Verde invites you to dine beyond the expected.

Paris on the plate. New York in the room`,
      images: ['/mila-miami-texture.png'],
      items: [
        {
          name: 'VERDE RESTAURANT',
          description: 'The distinctively curated rooftop aims to take guests on a culinary journey through the shores of the Mediterranean.',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg',
          link: '/restaurant'
        },
        {
          name: "VERDE PARTY'S",
          description: "Experience world-class hospitality at VERDYPARTY'S, where bespoke private events come to life.",
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork.jpg',
          link: '/dinner-party'
        },
        {
          name: 'VERDE Lounge',
          description: 'At VERDE lounge, intimate charm blends seamlessly with metropolitan energy.',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg-750x750.jpg',
          link: '/milalounge'
        },
        {
          name: 'VERDE BAR',
          description: 'VERDYBAR redefines Sunday Brunch with live music and exquisite Mediterranean fare.',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg.jpg',
          link: '/bar'
        }
      ],
      order: 2
    },
    {
      type: 'parallax',
      heading: 'Inspired by nature',
      content: 'Born in Paris. Celebrated in Saint-Tropez. Elevated in Dubai. Now, Verde arrives in New York—bringing two decades of Mediterranean excellence to the Meatpacking District.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8419.jpg'],
      order: 3
    },
    {
      type: 'text',
      heading: 'A Global Legacy of Culinary Excellence',
      content: 'The Yeeels Group has spent over a decade perfecting the art of festive dining across Europe and the Middle East. From the sophisticated elegance of Verde Paris on Avenue George V to the sun-drenched glamour of our Saint-Tropez beach club, from the cosmopolitan energy of Verde Dubai to the timeless charm of our Italian venues—each destination embodies our commitment to exceptional experiences.',
      ctaText: 'RESERVE YOUR EXPERIENCE',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      images: [],
      order: 4
    },
    {
      type: 'parallax',
      heading: 'The Art of Festive Dining',
      content: 'At the heart of the Yeeels Group philosophy lies a simple yet profound belief: dining should be transformative.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8490.jpg'],
      order: 5
    },
    {
      type: 'philosophy',
      heading: 'Our Philosophy',
      images: [
        '',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8425.jpg'
      ],
      items: [
        { name: 'Philosophy Part 1', description: 'The Yeeels Group was founded on a singular vision: to become the global leader in high-end festive dining.' },
        { name: 'Philosophy Part 2', description: 'Our three pillars—Food, Tribe, and Stories—define everything we do.' },
        { name: 'Art & Culture Title', description: 'ART & Culture' },
        { name: 'Art & Culture Part 1', description: 'The Yeeels Group has always believed that exceptional dining spaces require exceptional artistry.' },
        { name: 'Art & Culture Part 2', description: 'At Verde NYC, Japanese Wabi-Sabi philosophy meets Mediterranean warmth.' },
        { name: 'Art & Culture Part 3', description: 'For collaboration inquiries, contact us at pr@yeeels.com' }
      ],
      ctaText: 'CONTACT US',
      ctaLink: '/contact',
      order: 6
    },
    {
      type: 'gallery',
      heading: 'FOLLOW US ON INSTAGRAM',
      subheading: '@VERDE_NYC',
      ctaLink: 'https://www.instagram.com/verde_nyc',
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

// GALLERY PAGE
const galleryPageData = {
  slug: 'gallery',
  title: 'Gallery',
  sections: [
    {
      type: 'hero',
      heading: 'GALLERY',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg'],
      order: 1
    },
    {
      type: 'gallery',
      heading: 'Main Gallery',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4585-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4593-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4610-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4625-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4660-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4697-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4717-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4726-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4746-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4755-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4761-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4778-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4781-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4812-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4823-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4867.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4901.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4916-06fe9f00-f32f-4d49-b4f9-20b8f8a7f72ejpeg.jpeg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4939-db5620d8-89c3-4a1b-84c2-37308543f619jpeg.jpeg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4947-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4987-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5006-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5026-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5048-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5053-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5070-verde-newyork.jpg'
      ],
      order: 2
    }
  ]
};

// CONTACT PAGE
const contactPageData = {
  slug: 'contact',
  title: 'Contact',
  sections: [
    {
      type: 'hero',
      heading: 'CONTACT US',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8472.jpg'],
      order: 1
    },
    {
      type: 'contact_info',
      heading: 'VERDE NYC — A YEEELS GROUP VENUE',
      items: [
        { name: 'Address', description: '85 10th Avenue, New York City, NY 10011', link: 'https://maps.app.goo.gl/JLnMD7GPo3FHgSBb7' },
        { name: 'Reservations' },
        { name: 'Online Reservations', description: 'Click Here', link: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search' },
        { name: 'Phone', description: '+16467763660' },
        { name: 'Email', description: 'contact@verde-nyc.com' },
        { name: 'Private Events & Buyouts' },
        { name: 'Events Email', description: 'events@yeeels.com' },
        { name: 'Global Events Director', description: '+971 56 675 6965' },
        { name: 'Yeeels Group Headquarters' },
        { name: 'HQ Address', description: '24 Avenue George V, Paris 75008, France' },
        { name: 'HQ Email', description: 'contact@yeeels.com' },
        { name: 'Members Club' },
        { name: 'Membership', description: 'Explore Membership Benefits', link: '/membersclub' },
        { name: 'Social Instagram', link: 'https://www.instagram.com/verdenyc' },
        { name: 'Social SoundCloud', link: 'https://soundcloud.com/user-611720735' },
        { name: 'Social Facebook', link: 'https://www.facebook.com/verdenyc' },
        { name: 'Social Spotify', link: 'https://open.spotify.com/user/31prdeupjndbgg6f3yvdhbrmbvwq' }
      ],
      order: 2
    },
    {
      type: 'text',
      heading: 'Find Us In The Heart Of Manhattan',
      content: 'Part of the Yeeels Group family — with venues in Paris, Saint-Tropez, Dubai, Italy, and New York',
      ctaLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9593794733634!2d-74.00893432346168!3d40.74243103514894',
      order: 3
    }
  ]
};

// BAR PAGE
const barPageData = {
  slug: 'bar',
  title: 'Bar - Verde NYC',
  sections: [
    {
      type: 'hero',
      heading: 'Verde NYC brunch',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8503.jpg'],
      order: 1
    },
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
    {
      type: 'text',
      heading: 'The Yeeels Group Sunday brunch experience',
      content: 'From Saint-Tropez beach clubs to Parisian terraces, Sunday at the Yeeels Group has always been sacred. At Verde NYC, we bring this celebrated tradition to New York.',
      order: 3
    },
    {
      type: 'text',
      heading: 'Chef-curated Mediterranean stations',
      content: 'Inspired by the legendary brunch formats at our Saint-Tropez and Dubai venues, guests journey through artfully designed stations.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8515.jpg'],
      order: 4
    },
    {
      type: 'text',
      content: 'Your journey begins with an exquisite bakery selection featuring freshly baked croissants from recipes perfected in our Parisian kitchens.',
      order: 5
    },
    {
      type: 'text',
      heading: 'International beverage program',
      content: 'Our beverage packages reflect the Yeeels Group expertise cultivated across Paris, Saint-Tropez, Dubai, and Italy.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8519.jpg'],
      order: 6
    },
    {
      type: 'text',
      heading: 'Hours & location',
      content: 'Sunday | Noon - 5:00 PM\n\nGet Directions — 85 10th Avenue, Meatpacking District, New York City',
      ctaLink: 'https://maps.app.goo.gl/fqeZH3QPWLxBZFXY7',
      ctaText: 'Get Directions',
      order: 7
    },
    {
      type: 'text',
      heading: 'Reserve Your Sunday',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      ctaText: 'RESERVE BRUNCH',
      order: 8
    }
  ]
};

// DINNER PARTY PAGE
const dinnerPartyPageData = {
  slug: 'dinner-party',
  title: 'Dinner Party',
  sections: [
    {
      type: 'hero',
      heading: '',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg.jpg'],
      order: 1
    },
    {
      type: 'text',
      heading: 'World-Class Private Events by Yeeels Group',
      subheading: 'From Intimate Gatherings to Grand Celebrations',
      content: 'The Yeeels Group has orchestrated extraordinary private events across Paris, Saint-Tropez, Dubai, and Italy for over a decade.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8472.jpg'],
      ctaLink: 'mailto:event@verde-nyc.com',
      ctaText: 'INQUIRE ABOUT EVENTS',
      order: 2
    },
    {
      type: 'text',
      heading: 'Indoor Private Dining Rooms',
      content: 'Drawing inspiration from our celebrated venues across France, Italy, and the UAE.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8464.jpg'],
      order: 3
    },
    {
      type: 'text',
      heading: 'Outdoor Event Spaces',
      content: 'Inspired by our legendary beach clubs in Saint-Tropez and Dubai.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8469.jpg'],
      order: 4
    },
    {
      type: 'text',
      heading: 'VERDE LOUNGE',
      content: 'The Yeeels Group pioneered the concept of integrated lounge experiences.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8470.jpg'],
      order: 5
    },
    {
      type: 'text',
      heading: "Chef's Table Experience",
      content: 'For the most discerning hosts, our Chef\'s Table offers an intimate journey into culinary artistry.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8471.jpg'],
      order: 6
    }
  ]
};

// MENU PAGE
const menuPageData = {
  slug: 'menu',
  title: 'Menu',
  sections: [
    {
      type: 'hero',
      heading: 'OUR MENUS',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8416.jpg'],
      order: 1
    },
    {
      type: 'text',
      heading: 'CULINARY EXCELLENCE',
      content: 'Indulge in a symphony of flavors inspired by the elegance of Paris and the vibrant spirit of the Mediterranean.',
      order: 2
    },
    {
      type: 'menu-category',
      heading: 'FOOD MENU',
      content: 'Experience our curated Mediterranean and Asian fusion dishes',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8416.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Parades_DEC_page-0002.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025_Verde NYC - FINAL_DEC_page-0002.jpg'
      ],
      order: 3
    },
    {
      type: 'menu-category',
      heading: 'WINE MENU',
      content: 'Discover our exceptional selection of wines from around the world',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8417.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0002.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0003.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0004.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0005.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0006.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0007.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0008.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0009.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0010.jpg'
      ],
      order: 4
    },
    {
      type: 'menu-category',
      heading: 'BAR MENU',
      content: 'Explore our curated selection of cocktails and beverages',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8419.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0001.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0003.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0004.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0005.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0006.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0007.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0008.jpg'
      ],
      order: 5
    }
  ]
};

// RESTAURANT PAGE (with full menus)
const restaurantPageData = {
  slug: 'restaurant',
  title: 'Restaurant - Verde NYC',
  sections: [
    {
      type: 'hero',
      heading: '',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg'],
      order: 1
    },
    {
      type: 'philosophy',
      heading: 'A Yeeels Group Signature Destination',
      subheading: 'Verde NYC — Where Culinary Mastery Meets Celebration',
      content: 'From the glamorous avenues of Paris to the sun-kissed shores of Saint-Tropez, from the sophisticated skyline of Dubai to the vibrant pulse of Manhattan—the Yeeels Group has redefined festive dining across four continents.',
      images: ['https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/0c14fc2a-88f5-46a4-996e-8e0175295970/mila-miami-texture.png'],
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      ctaText: 'RESERVE YOUR TABLE',
      order: 2
    },
    {
      type: 'menu',
      heading: 'DINNER',
      subheading: 'Menu',
      content: `<h3><strong>Discover Verde NYC Experiences</strong></h3>
<div class="menu-experiences">
  <div class="experience-row">
    <div class="experience-item">
      <p>VERDE SIGNATURE TASTING MENU*<br/>5-course menu, chef's selection 155 - per person</p>
    </div>
    <div class="experience-item">
      <p>PREMIUM CHEF'S TASTING MENU*<br/>5-course menu, chef's premium selection 225 - per person</p>
    </div>
  </div>
</div>
<hr class="menu-divider" />
<h3><strong>Tapas | Share</strong></h3>
<div class="menu-items">
  <p>charred edamame, Verde spice, salt 11 <strong>(V)</strong></p>
  <p>blistered shishito peppers, tosazu miso, izak spice 14</p>
  <p><strong>chicken yakitori,</strong> fragrant teriyaki, spicy furikake, pickled fennel 22</p>
</div>`,
      order: 3
    },
    {
      type: 'menu',
      heading: 'COCKTAIL',
      subheading: 'Menu',
      content: `<h3><strong>Signature Cocktails</strong></h3>
<div class="menu-items">
  <p>VERDE SPRITZ - Aperol, prosecco, blood orange, rosemary 18</p>
  <p>MANHATTAN MULE - Vodka, ginger beer, lime, cucumber 17</p>
  <p>PARISIAN NEGRONI - Gin, Campari, sweet vermouth 19</p>
</div>`,
      order: 4
    },
    {
      type: 'menu',
      heading: 'WINE',
      subheading: 'Menu',
      content: `<h3><strong>Champagne</strong></h3>
<div class="menu-items">
  <p>Veuve Clicquot Yellow Label 180</p>
  <p>Dom Pérignon 450</p>
</div>`,
      order: 5
    },
    {
      type: 'menu',
      heading: 'DESSERT',
      subheading: 'Menu',
      content: `<h3><strong>Sweet Endings</strong></h3>
<div class="menu-items">
  <p>Chocolate Fondant, vanilla gelato 16</p>
  <p>Tiramisu, espresso, mascarpone 14</p>
</div>`,
      order: 6
    },
    {
      type: 'menu',
      heading: 'SUNDAY BRUNCH',
      subheading: 'Menu',
      content: `<h3><strong>Brunch Specials</strong></h3>
<div class="menu-items">
  <p>Eggs Benedict, hollandaise 24</p>
  <p>Avocado Toast, poached eggs 22</p>
</div>`,
      order: 7
    }
  ]
};

// ============================================
// SEED FUNCTION
// ============================================
const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('\n🗑️  Clearing existing data...');
    await Page.deleteMany({});
    console.log('   Pages cleared');

    console.log('\n📝 Seeding pages...\n');

    // Seed all pages
    const pages = [
      homePageData,
      galleryPageData,
      contactPageData,
      barPageData,
      dinnerPartyPageData,
      menuPageData,
      restaurantPageData
    ];

    for (const pageData of pages) {
      const page = await Page.create(pageData);
      console.log(`   ✅ ${page.title} (/${page.slug}) - ${page.sections.length} sections`);
    }

    // Check if admin exists, if not create one
    const adminExists = await Admin.findOne({});
    if (!adminExists) {
      console.log('\n👤 Creating default admin...');
      await Admin.create({
        email: 'admin@verde-nyc.com',
        password: 'verde2024'
      });
      console.log('   ✅ Admin created (admin@verde-nyc.com / verde2024)');
    } else {
      console.log('\n👤 Admin already exists');
    }

    console.log('\n✨ Database seeded successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Total pages created:', pages.length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
