const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const upload = multer();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("Bucket name not configured");
        }

        const fileName = `${Date.now()}-${req.file.originalname}`;
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            // ACL: 'public-read' // Removed to avoid AccessControlListNotSupported error if Bucket Owner Enforced is on
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        
        res.json({ url });
    } catch (error) {
        console.error("S3 Upload Error Full:", error);
        res.status(500).json({ 
            error: "Upload failed", 
            details: error.message,
            code: error.code || 'UNKNOWN_ERROR'
        });
    }
});

module.exports = router;
