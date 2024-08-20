const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

// Server creation route
router.post('/create', (req, res) => {
    const { type, version } = req.body;

    // Example: Run a shell script to create a server
    const script = spawn('bash', [path.join(__dirname, '../scripts/createServer.sh'), type, version]);

    script.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    script.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    script.on('close', (code) => {
        if (code === 0) {
            res.status(201).json({ message: 'Server created successfully!' });
        } else {
            res.status(500).json({ message: `Server creation failed with code ${code}` });
        }
    });
});

module.exports = router;