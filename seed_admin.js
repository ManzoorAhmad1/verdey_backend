/**
 * Seed initial admin credentials into MongoDB.
 * Run once: node seed_admin.js
 * Default: admin@verdenyc.com / Verde@2024
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/verde-nyc';

const seed = async () => {
  try {
    const opts = {
      retryWrites: false,
      authMechanism: 'SCRAM-SHA-1',
      authSource: 'admin',
      ...(process.env.DOCDB_TLS === 'true' && {
        tls: true,
        tlsCAFile: './global-bundle.pem',
      }),
    };
    await mongoose.connect(MONGO_URI, opts);
    console.log('MongoDB connected');

    // Remove existing admins
    await Admin.deleteMany({});

    const admin = new Admin({
      email: 'admin@verdenyc.com',
      password: 'Verde@2024',
    });

    await admin.save();

    console.log('✅ Admin seeded successfully!');
    console.log('   Email   : admin@verdenyc.com');
    console.log('   Password: Verde@2024');
    console.log('\n⚠️  Change password from Settings page!');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
