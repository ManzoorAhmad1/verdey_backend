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
            },
            {
                type: "contact_info",
                heading: "VERDE NYC — A YEEELS GROUP VENUE",
                items: [
                    { 
                        name: "Address", 
                        description: "85 10th Avenue, New York City, NY 10011", 
                        link: "https://maps.app.goo.gl/JLnMD7GPo3FHgSBb7" 
                    },
                    { name: "Reservations" },
                    { 
                        name: "Online Reservations", 
                        description: "Click Here", 
                        link: "https://www.sevenrooms.com/explore/verdenyc/reservations/create/search" 
                    },
                    { name: "Phone", description: "+16467763660" },
                    { name: "Email", description: "contact@verde-nyc.com" },
                    { name: "Private Events & Buyouts" },
                    { name: "Events Email", description: "events@yeeels.com" },
                    { name: "Global Events Director", description: "+971 56 675 6965" },
                    { name: "Yeeels Group Headquarters" },
                    { name: "HQ Address", description: "24 Avenue George V, Paris 75008, France" },
                    { name: "HQ Email", description: "contact@yeeels.com" },
                    { name: "Members Club" },
                    { name: "Membership", description: "Explore Membership Benefits", link: "/membersclub" },
                    { name: "Social Instagram", link: "https://www.instagram.com/verdenyc" },
                    { name: "Social SoundCloud", link: "https://soundcloud.com/user-611720735" },
                    { name: "Social Facebook", link: "https://www.facebook.com/verdenyc" },
                    { name: "Social Spotify", link: "https://open.spotify.com/user/31prdeupjndbgg6f3yvdhbrmbvwq" }
                ],
                order: 2
            },
            {
                type: "text",
                heading: "Find Us In The Heart Of Manhattan",
                content: "Part of the Yeeels Group family — with venues in Paris, Saint-Tropez, Dubai, Italy, and New York",
                ctaLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9593794733634!2d-74.00893432346168!3d40.74243103514894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf2f24f4a7%3A0x999!2s85%2010th%20Ave%2C%20New%20York%2C%20NY%2010011!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
                order: 3
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
