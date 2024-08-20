const fs = require('fs');
const path = require('path');

const updateFolder = '/path/to/updates';  // Replace with the path to your update folder

const applyUpdates = () => {
    fs.readdir(updateFolder, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const oldFilePath = path.join(__dirname, file);
            const newFilePath = path.join(updateFolder, file);

            fs.copyFile(newFilePath, oldFilePath, (err) => {
                if (err) throw err;
                console.log(`${file} was updated successfully.`);
            });
        });
    });
};

module.exports = applyUpdates;