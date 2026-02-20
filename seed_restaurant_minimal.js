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

const seedRestaurantMinimal = async () => {
    await connectDB();

    const pageData = {
        title: "Restaurant - Verde NYC",
        slug: "restaurant",
        sections: [
            // Section 1: Hero Image
            {
                type: "hero",
                heading: "",
                images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg"],
                order: 1
            },
            
            // Section 2: Philosophy
            {
                type: "philosophy",
                heading: "A Yeeels Group Signature Destination",
                subheading: "Verde NYC — Where Culinary Mastery Meets Celebration",
                content: "From the glamorous avenues of Paris to the sun-kissed shores of Saint-Tropez, from the sophisticated skyline of Dubai to the vibrant pulse of Manhattan—the Yeeels Group has redefined festive dining across four continents. At Verde NYC, this legacy of excellence finds its newest expression in an unforgettable culinary journey through Mediterranean and Asian flavors.\\n\\nOur award-winning culinary team sources the finest ingredients from trusted purveyors across the globe—line-caught fish from Japanese waters, premium wagyu from Kagoshima Prefecture, seasonal vegetables from local farms, and artisanal products from the Mediterranean coast. Each dish is a masterpiece of technique and creativity, honoring tradition while embracing innovation.\\n\\nWhether you join us for an intimate lunch overlooking the Meatpacking District or an electrifying evening of dining and entertainment, Verde NYC transforms every meal into a celebration. Dishes are designed for sharing, encouraging connection and conversation in an atmosphere that evolves from refined sophistication to vibrant festivity as the night unfolds.",
                images: ["https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/0c14fc2a-88f5-46a4-996e-8e0175295970/mila-miami-texture.png"],
                ctaLink: "https://www.sevenrooms.com/explore/verdenyc/reservations/create/search",
                ctaText: "RESERVE YOUR TABLE",
                order: 2
            },

            // Section 3: DINNER Menu Tab (ONLY ONE FOR NOW)
            {
                type: "menu",
                heading: "DINNER",
                subheading: "Menu",
                content: "charred edamame, Verde spice, salt 11\\nsalmon crispy rice, serrano pepper 24\\nwagyu beef tartare, bone marrow 35\\n\\ntuna tartare, roasted fennel-tofu aioli 32\\nhamachi crudo, avocado coulis 25\\n\\nseared salmon, hokkaido corn puree 38\\ngrilled madagascan shrimp, spicy miso butter 59\\nmediterrasian black cod, spicy miso 56",
                order: 3
            },

            // Section 4: Disclaimer
            {
                type: "text",
                heading: "Disclaimer",
                content: "GF - gluten free | V - vegan\\nAsk your server which additional dishes can be adjusted to become vegan friendly.\\n\\nEating raw or undercooked fish, shellfish or meat increases the risk of foodborne illness. 20% service charge will be added for your convenience.",
                order: 4
            },
            
            // Section 5: Food Gallery
            {
                type: "gallery",
                heading: "Food Gallery",
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
                order: 5
            }
        ]
    };

    try {
        await Page.findOneAndUpdate(
            { slug: 'restaurant' },
            pageData,
            { upsert: true, new: true }
        );
        console.log('✅ Restaurant page seeded with MINIMAL content (1 menu tab only)');
        console.log('📊 Total sections: 5');
        console.log('   - Hero Image');
        console.log('   - Philosophy Section');
        console.log('   - 1 Menu Tab (DINNER) - Simple text format');
        console.log('   - Disclaimer');
        console.log('   - Food Gallery');
        console.log('\\n🎯 Next: Test this works, then add more tabs one by one');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding restaurant page:', error);
        process.exit(1);
    }
};

seedRestaurantMinimal();
