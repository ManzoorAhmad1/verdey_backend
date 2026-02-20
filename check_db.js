const mongoose = require('mongoose');
require('dotenv').config();
const Page = require('./models/Page');

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected\n');
    
    const page = await Page.findOne({ slug: 'restaurant' });
    
    if (!page) {
      console.log('❌ No restaurant page found');
      process.exit(1);
    }
    
    console.log('📄 Page Title:', page.title);
    console.log('📊 Total Sections:', page.sections.length);
    console.log('\n' + '='.repeat(80) + '\n');
    
    page.sections.forEach((section, index) => {
      console.log(`📌 Section ${index + 1}:`);
      console.log(`   Order: ${section.order || 'N/A'}`);
      console.log(`   Type: ${section.type}`);
      console.log(`   Heading: ${section.heading || 'None'}`);
      console.log(`   Subheading: ${section.subheading || 'None'}`);
      console.log(`   Has Content: ${section.content ? 'Yes (' + section.content.substring(0, 50) + '...)' : 'No'}`);
      console.log(`   Images: ${section.images?.length || 0}`);
      if (section.images && section.images.length > 0) {
        section.images.forEach((img, i) => {
          console.log(`     Image ${i + 1}: ${img.substring(0, 60)}...`);
        });
      }
      console.log(`   CTA Link: ${section.ctaLink || 'None'}`);
      console.log(`   CTA Text: ${section.ctaText || 'None'}`);
      console.log(`   Items: ${section.items?.length || 0}`);
      console.log('\n' + '-'.repeat(80) + '\n');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDB();
