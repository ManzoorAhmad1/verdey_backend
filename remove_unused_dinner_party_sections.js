const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const connectDB = require('./config/db');

dotenv.config();

const updateDinnerPartyDb = async () => {
    try {
        await connectDB();

        // Fetch dinner-party page
        const page = await Page.findOne({ slug: 'dinner-party' });
        if (!page) {
            console.log('Dinner party page not found in DB!');
            process.exit(1);
        }

        // Keep only the sections that are currently being used in frontend (Orders 1, 2, 7, 8)
        // Order 1: Hero Images
        // Order 2: Intro text
        // Order 7: VIP Dining Experience
        // Order 8: Bar & Cocktail Lounge
        const ordersToKeep = [1, 2, 7, 8];
        const updatedSections = page.sections.filter(sec => ordersToKeep.includes(sec.order));

        page.sections = updatedSections;
        await page.save();

        console.log(`Unused sections have been removed from DB.`);
        console.log(`Remaining sections orders: ${updatedSections.map(s => s.order).join(', ')}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error updating DB:', error);
        process.exit(1);
    }
};

updateDinnerPartyDb();
