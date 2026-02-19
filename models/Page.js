const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['hero', 'gallery', 'text', 'features', 'philosophy', 'menu', 'contact_info', 'parallax'], 
    default: 'text' 
  },
  heading: String,
  subheading: String,
  content: String,
  images: [String],
  ctaLink: String,
  ctaText: String,
  order: { type: Number, default: 0 },
  styles: mongoose.Schema.Types.Mixed,
  items: [{
    name: String,
    description: String,
    price: String,
    image: String,
    link: String
  }]
});

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
