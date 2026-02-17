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
                content: "The Yeeels Group has orchestrated extraordinary private events across Paris, Saint-Tropez, Dubai, and Italy for over a decade. Now, this expertise arrives in New York. Verde NYC offers bespoke event experiences that blend Mediterranean elegance with Manhattan sophistication—from intimate chef's table dinners to full venue buyouts for up to 400 guests.",
                images: ["https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/0c14fc2a-88f5-46a4-996e-8e0175295970/mila-miami-texture.png"],
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
                type: "text", // Events Hosted Across
                heading: "Events Hosted Across Our Global Venues",
                content: "From haute couture fashion launches in Paris to royal celebrations in Dubai... The Yeeels Group has hosted the world's most discerning clientele.",
                order: 9
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
