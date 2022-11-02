const fs = require('fs');
const path = require('path');

fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, (err, data) => {
    data.forEach(file => {
        if(file.isFile() === true) {
            fs.stat(`03-files-in-folder/secret-folder/${file.name}`, (err, data) => {
                console.log(`${path.parse(file.name).name} - ${path.parse(file.name).ext.slice(1)} - ${data.size * 0.001}kb`)
            });
        };
    });
});