const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'domainConfig.json');

const setDomain = (domain) => {
    fs.writeFileSync(configPath, JSON.stringify({ domain }), (err) => {
        if (err) throw err;
        console.log(`Domain set to ${domain}`);
    });
};

const getDomain = () => {
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath));
        return config.domain;
    }
    return null;
};

module.exports = { setDomain, getDomain };