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

const seedBar = async () => {
    await connectDB();

    const pageData = {
        title: "Bar",
        slug: "bar",
        sections: [
            {
                type: "hero",
                heading: "Verde NYC brunch",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8503.jpg"],
                order: 1
            },
            {
                type: "gallery",
                heading: "Gallery Slider",
                images: [
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8504.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8506.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8507.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8510.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8511.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8513.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8514.jpg"
                ],
                order: 2
            }
        ]
    };

    try {
        const page = await Page.findOneAndUpdate(
            { slug: "bar" },
            pageData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("Bar page seeded successfully:", page.title);
    } catch (error) {
        console.error("Error seeding bar page:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedBar();
