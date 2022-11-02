const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

fs.mkdir(path.join(__dirname, 'files-copy'), {
    recursive: true
  },  err => {
    if (err) throw err;
});
fs.readdir('04-copy-directory/files-copy', (err, data) => {
  data.forEach(file => {
    fs.unlink(`04-copy-directory/files-copy/${file}`, err => {
      if(err) throw err;
   });
  });
});
fs.readdir('04-copy-directory/files', (err, data) => {
  data.forEach(file => {
      fsPromises.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`)
  });
  console.log('Files copied');
});