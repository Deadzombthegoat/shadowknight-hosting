const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Example route to change domain
router.post('/set-domain', (req, res) => {
    const { domain } = req.body;
    const configPath = path.join(__dirname, '../config/domainConfig.json');

    fs.writeFile(configPath, JSON.stringify({ domain }), (err) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: `Domain updated to ${domain}` });
    });
});

module.exports = router;