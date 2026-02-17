const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');
const Page = require('./models/Page');

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

// S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Helper to upload file to S3
const uploadToS3 = async (localPath, s3Key) => {
    // Check if file exists locally
    if (!fs.existsSync(localPath)) {
        console.warn(`File not found: ${localPath}`);
        return null;
    }

    // Check if duplicate exists on S3 to skip (optional, but good for speed)
    // For now, we overwrite or just upload.
    
    const fileContent = fs.readFileSync(localPath);
    const contentType = mime.lookup(localPath) || 'application/octet-stream';

    try {
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Key,
            Body: fileContent,
            ContentType: contentType,
            // ACL: 'public-read' // Only if bucket is not blocking public ACLs and you want it public
        });

        await s3.send(command);
        
        // Construct public URL
        const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
        console.log(`Uploaded: ${url}`);
        return url;
    } catch (error) {
        console.error(`S3 Upload Error for ${localPath}:`, error);
        return null;
    }
};

// Main Helper to process a content object and replace local image paths
// Paths in DB are often like "/images/file.jpg" or "/gallery/file.jpg"
// We map them to physical paths: "../public/images/file.jpg"
const processImages = async (obj) => {
    if (!obj) return obj;

    // Helper to process a single string URL
    const processUrl = async (url) => {
        if (!url || typeof url !== 'string') return url;
        if (url.startsWith('http')) return url; // Already remote

        let localPath = '';
        let s3Key = '';

        if (url.startsWith('/images/')) {
            localPath = path.join(__dirname, '../public/images', url.replace('/images/', ''));
            s3Key = `images/${url.replace('/images/', '')}`;
        } else if (url.startsWith('/gallery/')) {
            localPath = path.join(__dirname, '../public/gallery', url.replace('/gallery/', ''));
            s3Key = `gallery/${url.replace('/gallery/', '')}`;
        } else {
             // Fallback or other folders
             return url;
        }

        const s3Url = await uploadToS3(localPath, s3Key);
        return s3Url || url; // Fallback to original if upload fails
    };

    // Arrays of images
    if (obj.images && Array.isArray(obj.images)) {
        obj.images = await Promise.all(obj.images.map(img => processUrl(img)));
    }
    
    // Single image field (if any custom one exists, though 'image' key is common in my code)
    if (obj.image) {
        obj.image = await processUrl(obj.image);
    }

    return obj;
};


const importData = async () => {
    await connectDB();

    // The Seed Data (with Local Paths)
    let seedPages = [
        {
            title: 'Home',
            slug: 'home',
            sections: [
                {
                    type: 'hero',
                    heading: 'VERDE',
                    subheading: 'Experience the art of dining in NYC',
                    images: ['/images/_40A8419.jpg'], // Using actual file from file list
                    ctaText: 'Reserve Now',
                    ctaLink: '/reserve',
                    order: 1
                },
                {
                    type: 'features',
                    heading: 'Our Venue',
                    content: 'Discover our unique dining spaces designed for comfort and elegance.',
                    images: ['/images/_40A8442.jpg', '/images/_40A8455.jpg'],
                    order: 2
                },
                {
                    type: 'philosophy',
                    heading: 'Inspired by nature',
                    subheading: 'A multi-sensory culinary journey.',
                    images: ['/images/_40A8504.jpg'],
                    order: 3
                },
                {
                    type: 'gallery',
                    heading: 'Gallery',
                    images: [
                        '/gallery/40A4553-verde-newyork.jpg', 
                        '/gallery/40A4575-verde-newyork.jpg',
                        '/gallery/40A4726-verde-newyork.jpg',
                        '/gallery/40A4947-verde-newyork.jpg'
                    ],
                    order: 4
                }
            ]
        },
        {
            title: 'About',
            slug: 'about',
            sections: [
                {
                    type: 'hero',
                    heading: 'About Verde',
                    subheading: 'A sanctuary in the city',
                    images: ['/images/_40A8489.jpg'],
                    order: 1
                },
                {
                    type: 'text',
                    heading: 'Our Story',
                    content: 'Located in the heart of New York City, Verde brings together the freshest ingredients and culinary expertise.',
                    images: ['/images/_40A8527.jpg'],
                    order: 2
                }
            ]
        },
        {
             title: 'Menu',
             slug: 'menu',
             sections: [
                 { type: 'hero', heading: 'Our Menu', subheading: 'Culinary Excellence', images: ['/images/_40A8523.jpg'], order: 1 },
                 { type: 'text', heading: 'Explore Flavors', content: 'From fresh seafood to hand-crafted cocktails.', order: 2}
             ]
        },
        {
            title: 'Contact',
            slug: 'contact',
            sections: [
                { type: 'contact_info', heading: 'Get in Touch', content: '123 Broadway, New York, NY 10001', images: ['/images/_40A8464.jpg'], order: 1 }
            ]
        }
    ];

    try {
        console.log('Starting Migration and Upload...');
        
        // Process each page
        for (let page of seedPages) {
            console.log(`Processing Page: ${page.title}`);
            if (page.sections) {
                for (let section of page.sections) {
                    await processImages(section);
                }
            }
        }

        // Clear existing and insert new
        await Page.deleteMany();
        await Page.insertMany(seedPages);

        console.log('Data Imported and Images Uploaded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
