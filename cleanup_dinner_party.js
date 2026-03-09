const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const Page = require('./models/Page');

const run = async () => {
  await connectDB();
  const result = await Page.deleteOne({ slug: 'dinner-party' });
  console.log(result.deletedCount ? 'Deleted dinner-party page from DB.' : 'No dinner-party page found.');
  process.exit(0);
};

run().catch(e => { console.error(e.message); process.exit(1); });
