const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const readTemplate = fs.createReadStream('06-build-page/template.html', 'utf-8');
fs.mkdir('06-build-page/project-dist', err => {});
fs.createWriteStream('06-build-page/project-dist/index.html');
fs.createWriteStream('06-build-page/project-dist/style.css');

readTemplate.on('data', function(chank) {
    templateContent = chank;
    readTemplateContent();

});

function readTemplateContent() {
    fs.readdir('06-build-page/components', (err, data) => {
        data.forEach(file => {
            if(path.parse(file).ext === '.html') {
                fs.readFile(`06-build-page/components/${file}`, 'utf-8', (err, content) => {
                    templateContent = templateContent.toString().replace(`{{${path.parse(file).name}}}`, `${content}`);
                    fs.writeFile('06-build-page/project-dist/index.html', `${templateContent}`, err => {});
                });
            };
        });
    });
};
fs.readdir('06-build-page/styles', {withFileTypes: true}, (err, data) => {
    data.forEach(file => {
        if(file.isFile() === true && path.parse(file.name).ext === '.css') {
            fs.readFile(`06-build-page/styles/${file.name}`, (err, content) => {
                fs.appendFile('06-build-page/project-dist/style.css', content, err => {
                    if(err) throw err;
                });
            });
        };
    });
});

fs.mkdir('06-build-page/project-dist/assets', err => {
    fs.readdir('06-build-page/assets', (err, data) => {
        data.forEach(dirFiles => {
            fs.readdir(`06-build-page/assets/${dirFiles}`, (err, data) => {
                fs.mkdir(`06-build-page/project-dist/assets/${dirFiles}`, err => {});
                data.forEach(file => {
                    fsPromises.copyFile(`06-build-page/assets/${dirFiles}/${file}`, `06-build-page/project-dist/assets/${dirFiles}/${file}`);
                });
            });
        });
    });
});