const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const deleteFromS3 = async (url) => {
    try {
        if (!url || !url.includes('amazonaws.com')) return;
        const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME;
        const key = url.split('/').pop(); // Extract filename from URL
        
        await s3.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key
        }));
        console.log(`Deleted from S3: ${key}`);
    } catch (error) {
        console.error("S3 Delete Error:", error);
    }
};

// @desc    Get all pages
// @route   GET /api/pages
router.get('/', async (req, res) => {
    try {
        const pages = await Page.find({});
        res.json({ pages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single page
// @route   GET /api/pages/:slug
router.get('/:slug', async (req, res) => {
    try {
        // Set no-cache headers to ensure fresh data
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store'
        });

        const page = await Page.findOne({ slug: req.params.slug });
        if (page) {
            res.json({ page });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create new page
// @route   POST /api/pages
router.post('/', async (req, res) => {
    try {
        const { title, slug, seoTitle, seoDescription, sections } = req.body;
        const page = new Page({ title, slug, seoTitle, seoDescription, sections });
        const createdPage = await page.save();
        res.status(201).json({ message: "Page created", page: createdPage });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update page
// @route   PUT /api/pages/:id
router.put('/:id', async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (page) {
            // Find old image URLs in sections
            const oldImages = new Set();
            page.sections.forEach(section => {
                if (section.images) section.images.forEach(img => oldImages.add(img));
                if (section.image) oldImages.add(section.image);
            });

            page.title = req.body.title || page.title;
            page.slug = req.body.slug || page.slug;
            page.seoTitle = req.body.seoTitle !== undefined ? req.body.seoTitle : page.seoTitle;
            page.seoDescription = req.body.seoDescription !== undefined ? req.body.seoDescription : page.seoDescription;
            page.sections = req.body.sections || page.sections;
            
            // Find new image URLs
            const newImages = new Set();
            page.sections.forEach(section => {
                if (section.images) section.images.forEach(img => newImages.add(img));
                if (section.image) newImages.add(section.image);
            });

            // Identify removed images
            const imagesToDelete = [...oldImages].filter(img => !newImages.has(img));

            // Delete imagesToDelete from S3
            if (imagesToDelete.length > 0) {
                console.log('Images to delete from S3:', imagesToDelete);
                for (const imgUrl of imagesToDelete) {
                    await deleteFromS3(imgUrl);
                }
            }

            const updatedPage = await page.save();
            res.json({ message: "Page updated", page: updatedPage });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete page
// @route   DELETE /api/pages/:id
router.delete('/:id', async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (page) {
            await page.deleteOne();
            res.json({ message: 'Page removed' });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
