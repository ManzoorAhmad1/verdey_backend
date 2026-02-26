const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');

// Default values (keep in sync with model)
const DEFAULTS = {
    siteTitle: 'Verde NYC | Festive Restaurant in New York',
    siteDescription: 'Discover Verde NYC in the Meatpacking District: a festive Mediterranean restaurant with refined dining, signature atmosphere, and unforgettable nights.',
    siteKeywords: 'Verde NYC, Mediterranean restaurant, Meatpacking District, festive dining, New York restaurant',
    phone: '+16467763660',
    email: 'contact@verde-nyc.com',
    instagramUrl: '',
};

// @desc    Get site settings
// @route   GET /api/settings
router.get('/', async (req, res) => {
    try {
        let settings = await SiteSettings.findById('global');
        
        // If no settings exist, create default
        if (!settings) {
            settings = await SiteSettings.create({ _id: 'global' });
        }
        
        // Return settings with defaults for empty values
        const response = {
            siteTitle: settings.siteTitle || DEFAULTS.siteTitle,
            siteDescription: settings.siteDescription || DEFAULTS.siteDescription,
            siteKeywords: settings.siteKeywords || DEFAULTS.siteKeywords,
            phone: settings.phone || DEFAULTS.phone,
            email: settings.email || DEFAULTS.email,
            instagramUrl: settings.instagramUrl || DEFAULTS.instagramUrl,
        };
        
        res.json({ settings: response });
    } catch (error) {
        console.error('Settings fetch error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update site settings
// @route   PUT /api/settings
router.put('/', async (req, res) => {
    try {
        const {
            siteTitle,
            siteDescription,
            siteKeywords,
            logoUrl,
            instagramUrl,
            facebookUrl,
            phone,
            email,
            address
        } = req.body;

        let settings = await SiteSettings.findById('global');
        
        if (!settings) {
            settings = new SiteSettings({ _id: 'global' });
        }

        // Update fields if provided
        if (siteTitle !== undefined) settings.siteTitle = siteTitle;
        if (siteDescription !== undefined) settings.siteDescription = siteDescription;
        if (siteKeywords !== undefined) settings.siteKeywords = siteKeywords;
        if (logoUrl !== undefined) settings.logoUrl = logoUrl;
        if (instagramUrl !== undefined) settings.instagramUrl = instagramUrl;
        if (facebookUrl !== undefined) settings.facebookUrl = facebookUrl;
        if (phone !== undefined) settings.phone = phone;
        if (email !== undefined) settings.email = email;
        if (address !== undefined) settings.address = address;

        await settings.save();
        
        res.json({ message: 'Settings updated', settings });
    } catch (error) {
        console.error('Settings update error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
