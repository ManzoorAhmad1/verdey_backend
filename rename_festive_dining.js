const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const connectDB = require('./config/db');

dotenv.config();

const run = async () => {
  await connectDB();

  const result = await Page.findOneAndUpdate(
    { slug: 'dinner-party' },
    { $set: { title: 'Festive Dining' } },
    { new: true }
  );

  if (result) {
    console.log(`Updated page title to: ${result.title}`);
  } else {
    console.log('Page with slug "dinner-party" not found.');
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
