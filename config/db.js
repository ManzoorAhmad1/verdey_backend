const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const opts = {
            retryWrites: false,          // Required for Amazon DocumentDB
            serverSelectionTimeoutMS: 10000,
            authMechanism: 'SCRAM-SHA-1',
            authSource: 'admin',
            ...(process.env.DOCDB_TLS === 'true' && {
                tls: true,
                tlsCAFile: './global-bundle.pem',
                tlsAllowInvalidCertificates: false,
            }),
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, opts);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
