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

const seedRestaurant = async () => {
    await connectDB();

    const pageData = {
        title: "Restaurant",
        slug: "restaurant",
        sections: [
            {
                type: "hero",
                heading: "",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg"],
                order: 1
            },
            {
                type: "philosophy",
                heading: "A Yeeels Group Signature Destination",
                subheading: "Verde NYC — Where Culinary Mastery Meets Celebration",
                content: "From the glamorous avenues of Paris to the sun-kissed shores of Saint-Tropez...",
                images: ["https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/0c14fc2a-88f5-46a4-996e-8e0175295970/mila-miami-texture.png"],
                ctaLink: "https://www.sevenrooms.com/explore/verdenyc/reservations/create/search",
                ctaText: "RESERVE YOUR TABLE",
                order: 2
            },
            {
                type: "gallery", // Food Gallery at the bottom
                heading: "Gallery",
                images: [
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/verde-lifestyle-1.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8444.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/mixology-cocktails.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8455.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/Decadence-verde-dubai-0693.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8460.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/verde-lifestyle-8.jpg",
                     "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8527.jpg"
                ],
                order: 3
            }
        ]
    };

    try {
        const page = await Page.findOneAndUpdate(
            { slug: "restaurant" },
            pageData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("Restaurant page seeded successfully:", page.title);
    } catch (error) {
        console.error("Error seeding restaurant page:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedRestaurant();
