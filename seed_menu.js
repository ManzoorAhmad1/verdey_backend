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

const seedMenu = async () => {
    await connectDB();

    const pageData = {
        title: "Menu",
        slug: "menu",
        sections: [
            {
                type: "hero",
                heading: "OUR MENUS",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8416.jpg"],
                order: 1
            },
            {
                type: "menu-category",
                heading: "FOOD MENU",
                content: "Experience our curated Mediterranean and Asian fusion dishes",
                images: [
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8416.jpg", // Cover
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Parades_DEC_page-0002.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025_Verde NYC - FINAL_DEC_page-0002.jpg"
                ],
                order: 2
            },
            {
                type: "menu-category",
                heading: "WINE MENU",
                content: "Discover our exceptional selection of wines from around the world",
                images: [
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8417.jpg", // Cover
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0002.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0003.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0004.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0005.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0006.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0007.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0008.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0009.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0010.jpg"
                ],
                order: 3
            },
            {
                type: "menu-category",
                heading: "BAR MENU",
                content: "Explore our curated selection of cocktails and beverages",
                images: [
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8419.jpg", // Cover
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0001.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0003.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0004.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0005.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0006.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0007.jpg",
                    "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0008.jpg"
                ],
                order: 4
            }
        ]
    };

    try {
        const page = await Page.findOneAndUpdate(
            { slug: "menu" },
            pageData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("Menu page seeded successfully:", page.title);
    } catch (error) {
        console.error("Error seeding menu page:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedMenu();
