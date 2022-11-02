const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
const { stdin, stdout } = process;

stdout.write('Hi! Write your text, please.\n');
stdin.on('data', data => {
  let text = data.toString().trim()
 
  if(text === 'exit') {
    stdout.write('Bye, good luck!');
    process.exit();
  } else {
    writeStream.write(`${text}\n`);
  }
})

process.on('SIGINT', () => {
  stdout.write('\nBye, good luck!');
  process.exit();
});