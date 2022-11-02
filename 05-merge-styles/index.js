const fs = require('fs');
const path = require('path');

fs.createWriteStream('05-merge-styles/project-dist/bundle.css');
fs.readdir('05-merge-styles/styles', {withFileTypes: true}, (err, data) => {
    data.forEach(file => {
        if(file.isFile() === true && path.parse(file.name).ext === '.css') {
            fs.readFile(`05-merge-styles/styles/${file.name}`, (err, content) => {
                fs.appendFile('05-merge-styles/project-dist/bundle.css', content, err => {
                    if(err) throw err;
                });
            });
        };
    });
});