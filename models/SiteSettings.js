const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  // There should only be one document
  _id: { type: String, default: 'global' },
  
  // Site title shown in browser tab
  siteTitle: { type: String, default: 'Verde NYC | Festive Restaurant in New York' },
  
  // Default meta description
  siteDescription: { type: String, default: 'Discover Verde NYC in the Meatpacking District: a festive Mediterranean restaurant with refined dining, signature atmosphere, and unforgettable nights.' },
  
  // Keywords for SEO
  siteKeywords: { type: String, default: 'Verde NYC, Mediterranean restaurant, Meatpacking District, festive dining, New York restaurant' },
  
  // Logo URL
  logoUrl: { type: String, default: '/images/logo-Verde-NYC-green.png' },
  
  // Social links
  instagramUrl: { type: String, default: '' },
  facebookUrl: { type: String, default: '' },
  
  // Contact info
  phone: { type: String, default: '+16467763660' },
  email: { type: String, default: 'contact@verde-nyc.com' },
  address: { type: String, default: '' },
  
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
