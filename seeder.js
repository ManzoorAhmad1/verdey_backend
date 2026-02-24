const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page'); // Ensure this path is correct relative to where you run the script

dotenv.config();

const connectDB = async () => {
    try {
        const opts = {
            retryWrites: false,
            authMechanism: 'SCRAM-SHA-1',
            authSource: 'admin',
            ...(process.env.DOCDB_TLS === 'true' && {
                tls: true,
                tlsCAFile: './global-bundle.pem',
            }),
        };
        const conn = await mongoose.connect(process.env.MONGO_URI, opts);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedPages = [
    {
        title: 'Home',
        slug: 'home',
        sections: [
            {
                type: 'hero',
                heading: 'MILA',
                subheading: 'Experience the art of dining',
                images: ['/images/hero-bg.jpg'],
                order: 1
            },
            {
                type: 'features',
                heading: 'Our Venues',
                content: 'Discover our unique dining spaces.',
                order: 2
            },
            {
                type: 'philosophy',
                heading: 'Inspired by nature',
                subheading: 'A multi-sensory culinary journey.',
                order: 3
            },
            {
                type: 'features',
                heading: 'Instagram',
                content: 'Follow us @mila_miami',
                order: 4
            }
        ]
    },
    {
        title: 'Restaurant',
        slug: 'restaurant',
        sections: [
            {
                type: 'hero',
                heading: 'The Restaurant',
                subheading: 'Modern Asian-Mediterranean Cuisine',
                images: ['/images/restaurant-hero.jpg'],
                order: 1
            },
            {
                type: 'text',
                heading: 'About Us',
                content: 'We bring the flavors of the Mediterranean and Japan together.',
                order: 2
            }
        ]
    },
    {
        title: 'NMM',
        slug: 'nmm',
        sections: [
            { type: 'hero', heading: 'NMM', order: 1 }
        ]
    },
    {
        title: 'Mila Lounge',
        slug: 'milalounge',
        sections: [
            { type: 'hero', heading: 'Mila Lounge', subheading: 'Nightlife redefined', order: 1 }
        ]
    },
    {
        title: 'Mila Omakase',
        slug: 'milaomakase',
        sections: [
            { type: 'hero', heading: 'Omakase Experience', subheading: 'Chef\'s strict selection', order: 1 }
        ]
    },
    {
        title: 'Menu',
        slug: 'menu',
        sections: [
            { type: 'menu', heading: 'Dinner Menu', items: [{ name: 'Spicy Tuna', price: '$18' }], order: 1 },
            { type: 'menu', heading: 'Cocktails', items: [{ name: 'Mila Margarita', price: '$22' }], order: 2 }
        ]
    },
    {
        title: 'Private Dining',
        slug: 'private-dining',
        sections: [
            { type: 'text', heading: 'Private Events', content: 'Host your special occasion with us.', order: 1 }
        ]
    },
    {
        title: 'Gallery',
        slug: 'gallery',
        sections: [
            { type: 'gallery', heading: 'Photo Gallery', images: ['/gallery/1.jpg', '/gallery/2.jpg'], order: 1 }
        ]
    },
    {
        title: 'Contact',
        slug: 'contact',
        sections: [
            { type: 'contact_info', heading: 'Get in Touch', content: '123 Ocean Drive, Miami Beach, FL', order: 1 }
        ]
    },
    {
        title: 'Reserve',
        slug: 'reserve',
        sections: [
            { type: 'hero', heading: 'Reservations', ctaLink: 'https://opentable.com', ctaText: 'Book Now', order: 1 }
        ]
    },
     {
        title: 'Gift Card',
        slug: 'gift-card',
        sections: [
            { type: 'hero', heading: 'Gift Cards', ctaLink: '#', ctaText: 'Purchase', order: 1 }
        ]
    },
     {
        title: 'Valentines Day',
        slug: 'valentines-day',
        sections: [
             { type: 'hero', heading: 'Valentines Special', order: 1 }
        ]
    }
];

const importData = async () => {
    await connectDB();
    try {
        await Page.deleteMany(); // Clear existing pages
        await Page.insertMany(seedPages);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
