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

const seedGallery = async () => {
    await connectDB();

    const pageData = {
        title: "Gallery",
        slug: "gallery",
        sections: [
            {
                type: "hero",
                heading: "GALLERY",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg"],
                order: 1
            },
            {
                type: "gallery",
                heading: "Main Gallery",
                images: [
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4585-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4593-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4610-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4625-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4660-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4697-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4717-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4726-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4746-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4755-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4761-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4778-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4781-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4812-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4823-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4867.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4901.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4916-06fe9f00-f32f-4d49-b4f9-20b8f8a7f72ejpeg.jpeg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4939-db5620d8-89c3-4a1b-84c2-37308543f619jpeg.jpeg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4947-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4987-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5006-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5026-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5048-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5053-verde-newyork.jpg",
                  "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5070-verde-newyork.jpg"
                ],
                order: 2
            }
        ]
    };

    try {
        const page = await Page.findOneAndUpdate(
            { slug: "gallery" },
            pageData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("Gallery page seeded successfully:", page.title);
    } catch (error) {
        console.error("Error seeding gallery page:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedGallery();
