# Images Migration

This script (`migrate_content.js`) helps you upload your existing local images (from `public/images` and `public/gallery`) to AWS S3 and populate your CMS database with the correct S3 URLs.

## Prerequisites

1.  **Configure `.env`**: Ensure your `backend/.env` has correct AWS S3 credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `AWS_REGION`) and `MONGO_URI`.
2.  **Install Dependencies**: Ensure you have run `npm install` in the `backend` folder.

## Usage

1.  Open a terminal in the `backend` directory.
2.  Run the migration script:
    ```bash
    node migrate_content.js
    ```

## What it does

1.  Connects to MongoDB.
2.  Defines a seed of "Pages" (Home, Menu, etc.) with references to your local images (e.g., `/images/_40A8419.jpg`).
3.  Loops through every section of every page.
4.  Finds the local file in `../public/images` or `../public/gallery`.
5.  Uploads the file to your S3 Bucket.
6.  Replaces the local path in the data with the new public S3 URL.
7.  Saves the pages to MongoDB, overwriting any existing data.

## Troubleshooting

-   **"File not found"**: The script expects `cms` and `backend` to be siblings, or `public` to be in the parent of `backend`. Check the `path.join` logic in `migrate_content.js` if your folder structure is different.
-   **S3 upload fails**: Check your IAM permissions for the AWS user. They need `s3:PutObject` and `s3:PutObjectAcl` (if using ACLs).
