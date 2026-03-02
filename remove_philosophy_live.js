require('dotenv').config();
const mongoose = require('mongoose');
const Page = require('./models/Page');
const fs = require('fs');

// Force use of live MongoDB URI (DocumentDB)
const mongoURI = process.env.MONGO_URI;

console.log('⚠️  WARNING: This will remove philosophy sections from LIVE DATABASE');
console.log('🔗 URI:', mongoURI.replace(/:[^:]*@/, ':****@')); // Hide password

async function removePhilosophySections() {
  try {
    console.log('\n🔄 Connecting to LIVE MongoDB...');
    
    // DocumentDB connection options
    const options = {
      tls: true,
      tlsCAFile: './global-bundle.pem',
      retryWrites: false,
      authMechanism: 'SCRAM-SHA-1',
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
    };
    
    await mongoose.connect(mongoURI, options);
    console.log('✅ Connected to LIVE MongoDB');

    // Find all pages and remove philosophy sections
    const pages = await Page.find({});
    console.log(`📄 Found ${pages.length} page(s) to check\n`);
    
    let totalRemoved = 0;

    for (const page of pages) {
      const originalLength = page.sections.length;
      const philosophySections = page.sections.filter(section => section.type === 'philosophy');
      
      if (philosophySections.length > 0) {
        console.log(`📋 Page: "${page.title}"`);
        console.log(`   Found ${philosophySections.length} philosophy section(s):`);
        philosophySections.forEach((sec, idx) => {
          console.log(`   ${idx + 1}. Heading: "${sec.heading || 'N/A'}"`);
        });
        
        page.sections = page.sections.filter(section => section.type !== 'philosophy');
        await page.save();
        
        const removed = originalLength - page.sections.length;
        console.log(`   ✅ Removed ${removed} section(s)\n`);
        totalRemoved += removed;
      }
    }

    if (totalRemoved === 0) {
      console.log('ℹ️  No philosophy sections found in live database');
    } else {
      console.log(`\n🎉 Successfully removed ${totalRemoved} philosophy section(s) from LIVE database`);
    }

    await mongoose.disconnect();
    console.log('👋 Disconnected from LIVE MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

removePhilosophySections();
