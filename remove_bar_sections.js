const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const connectDB = require('./config/db');

dotenv.config();

const removeBarSections = async () => {
    try {
        await connectDB();

        // Pehle "bar" page fetch karte hain jisme brunch ka data h
        const page = await Page.findOne({ slug: 'bar' });
        if (!page) {
            console.log('Bar / Brunch page not found in DB!');
            process.exit(1);
        }

        // 'Hours & location' (order 7)
        // 'Reserve Your Sunday' (order 8)
        // 'Sunday brunch menu' (order 9) 
        // In teeno ko remove kar dete hain

        const ordersToRemove = [7, 8, 9];
        const updatedSections = page.sections.filter(sec => !ordersToRemove.includes(sec.order));

        page.sections = updatedSections;
        await page.save();

        console.log(`Unused sections (Hours & Location, Reserve Brunch, Explore Menu) have been removed from Live DB successfully.`);
        console.log(`Remaining sections orders: ${updatedSections.map(s => s.order).join(', ')}`);

        process.exit(0);
    } catch (error) {
        console.error('Error updating DB:', error);
        process.exit(1);
    }
};

removeBarSections();
