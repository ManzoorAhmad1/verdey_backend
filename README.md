# Verde NYC Backend

This is the Express.js backend for the Verde NYC CMS. It handles data persistence (MongoDB) and file uploads (AWS S3).

## Prerequisites

1.  **Node.js** installed.
2.  **MongoDB** connection string (Atlas or local).
3.  **AWS S3** bucket credentials (for image uploads).

## Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` root folder with the following variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    AWS_ACCESS_KEY_ID=your_aws_access_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret_key
    AWS_REGION=us-east-1
    S3_BUCKET_NAME=your_s3_bucket_name
    ```

## Running the Server

Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

-   `GET /api/pages` - Get all pages
-   `GET /api/pages/:slug` - Get a single page by slug
-   `POST /api/pages` - Create a new page
-   `PUT /api/pages/:id` - Update a page
-   `DELETE /api/pages/:id` - Delete a page
-   `POST /api/upload` - Upload an image to S3

## Deployment (EC2)

1.  Clone the repo to your EC2 instance.
2.  Navigate to `backend`.
3.  Install dependencies (`npm install`).
4.  Set up environment variables (e.g., in `.env` or system var).
5.  Use `pm2` to keep the server running:
    ```bash
    npm install -g pm2
    pm2 start server.js --name "verde-backend"
    ```
