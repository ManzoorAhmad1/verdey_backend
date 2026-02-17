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

const seedContact = async () => {
    await connectDB();

    const pageData = {
        title: "Contact",
        slug: "contact",
        sections: [
            {
                type: "hero",
                heading: "CONTACT US",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8472.jpg"],
                order: 1
            }
        ]
    };

    try {
        const page = await Page.findOneAndUpdate(
            { slug: "contact" },
            pageData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("Contact page seeded successfully:", page.title);
    } catch (error) {
        console.error("Error seeding contact page:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedContact();
