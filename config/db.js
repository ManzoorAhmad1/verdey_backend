const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const isDocDB = process.env.DOCDB_TLS === 'true';

        // Local dev: use LOCAL_MONGO_URI if DocDB TLS is not enabled
        const uri = !isDocDB && process.env.LOCAL_MONGO_URI
            ? process.env.LOCAL_MONGO_URI
            : process.env.MONGO_URI;

        const opts = isDocDB
            ? {
                retryWrites: false,
                serverSelectionTimeoutMS: 10000,
                authMechanism: 'SCRAM-SHA-1',
                authSource: 'admin',
                tls: true,
                tlsCAFile: './global-bundle.pem',
                tlsAllowInvalidCertificates: false,
              }
            : {
                serverSelectionTimeoutMS: 10000,
              };

        const conn = await mongoose.connect(uri, opts);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
