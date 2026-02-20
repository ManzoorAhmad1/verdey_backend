const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

const seedDinnerParty = async () => {
    await connectDB();

    const pageData = {
        title: "Dinner Party",
        slug: "dinner-party",
        sections: [
            {
                type: "hero",
                heading: "",
                subheading: "",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg.jpg"],
                order: 1
            },
            {
                type: "text", // Intro
                heading: "World-Class Private Events by Yeeels Group",
                subheading: "From Intimate Gatherings to Grand Celebrations",
                content: "The Yeeels Group has orchestrated extraordinary private events across Paris, Saint-Tropez, Dubai, and Italy for over a decade. Now, this expertise arrives in New York. Verde NYC offers bespoke event experiences that blend Mediterranean elegance with Manhattan sophistication—from intimate chef's table dinners to full venue buyouts for up to 400 guests. Our dedicated events team brings the same meticulous attention to detail that has made our venues the preferred choice for discerning hosts across Europe and the Middle East.\n\nContact our global events team to begin crafting your extraordinary occasion: events@yeeels.com",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8472.jpg"],
                ctaLink: "mailto:event@verde-nyc.com",
                ctaText: "INQUIRE ABOUT EVENTS",
                order: 2
            },
            {
                type: "text", // Indoor Private Dining (Image Left/Text Right by default, we'll handle layout in frontend based on order or custom field if needed, currently alternating)
                heading: "Indoor Private Dining Rooms",
                content: "Drawing inspiration from our celebrated venues across France, Italy, and the UAE, Verde NYC's private dining rooms are architectural masterpieces designed to create lasting impressions.",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8464.jpg"],
                order: 3
            },
            {
                type: "text", // Outdoor Event Spaces
                heading: "Outdoor Event Spaces",
                content: "Inspired by our legendary beach clubs in Saint-Tropez and Dubai, Verde NYC's rooftop terrace brings open-air Mediterranean glamour to the heart of Manhattan.",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8469.jpg"],
                order: 4
            },
            {
                type: "text", // VERDE LOUNGE
                heading: "VERDE LOUNGE",
                content: "The Yeeels Group pioneered the concept of integrated lounge experiences across our Paris and Dubai venues, and Verde Lounge NYC represents the pinnacle of this evolution.",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8470.jpg"],
                order: 5
            },
            {
                type: "text", // Chef's Table
                heading: "Chef's Table Experience",
                content: "For the most discerning hosts, our Chef's Table offers an intimate journey into culinary artistry—a concept perfected across our Michelin-recognized kitchens in Paris and refined for the New York palate.",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8471.jpg"],
                order: 6
            },
            {
                type: "text", // VIP Dining
                heading: "VIP Dining Experience",
                content: "Our VIP dining areas offer an elevated experience for guests seeking privacy and exclusivity.",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8541.jpg"],
                order: 7
            },
            {
                type: "text", // Bar & Cocktail Lounge
                heading: "Bar & Cocktail Lounge",
                content: "The Verde NYC bar showcases our world-class mixology program, featuring signature cocktails crafted by internationally trained bartenders.",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8544.jpg"],
                order: 8
            },
            {
                type: "text", // Brochure Section
                heading: "The Yeeels Group Event Experience",
                content: "From corporate galas in Dubai to society weddings in Saint-Tropez, we have perfected the art of exceptional hospitality. Let our New York team create an unforgettable celebration tailored to your vision, with the same excellence that defines every Yeeels Group venue worldwide.",
                ctaLink: "mailto:events@yeeels.com",
                ctaText: "CONTACT GLOBAL EVENTS",
                order: 9
            },
            {
                type: "text", // Events Hosted Across
                heading: "Events Hosted Across Our Global Venues",
                content: "From haute couture fashion launches in Paris to royal celebrations in Dubai, from intimate celebrity dinners in Saint-Tropez to Fortune 500 corporate gatherings across our network—the Yeeels Group has hosted the world's most discerning clientele. At Verde NYC, we bring this unparalleled expertise to every event, whether an elegant birthday soirée, a sophisticated engagement dinner, or a landmark corporate milestone.\n\nOur dedicated team crafts bespoke experiences tailored to your vision, with access to our global network of culinary talent, entertainment partnerships, and design resources. Beyond our exceptional cuisine, we offer custom décor, international branding opportunities, world-class entertainment, and state-of-the-art technical capabilities—all orchestrated with the precision that has made us leaders in four countries.",
                order: 10
            },
            {
                type: "text", // Complete Venue Buyouts
                heading: "Complete Venue Buyouts",
                content: "A private buyout of Verde NYC offers truly unparalleled exclusivity—complete access to all four of our distinctive spaces, with the freedom to customize every element to your vision. Transform our rooftop into a Parisian garden party, channel the energy of our Dubai venues for a corporate gala, or create an entirely new concept limited only by imagination. Our international events team brings expertise from across our global portfolio to ensure flawless execution.\n\nFor private event inquiries, contact our global events team at events@yeeels.com or reach Maksim Dirgela directly at +971 56 675 6965.",
                ctaLink: "mailto:events@yeeels.com",
                ctaText: "inquire about your event",
                order: 11
            }
        ]
    };

    try {
        const page = await Page.findOneAndUpdate(
            { slug: "dinner-party" },
            pageData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("Dinner Party page seeded successfully:", page.title);
    } catch (error) {
        console.error("Error seeding dinner party page:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDinnerParty();
