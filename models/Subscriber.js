const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  source: { type: String, default: 'footer' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
