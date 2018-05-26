const fs = require('fs');
const path = require('path');

function renameIt(oldName, newName) {
  fs.rename(oldName, newName, (err) => {
    if (err) throw err;
    console.log('done', oldName);
  })
}

function crawlFiles(startingPoint, excludeFolder) {
  fs.readdir(startingPoint, (err, files) => {
    if (err) throw err;
    if (!files.length) {
      return;      
    } else {
      files.forEach((file) => {
        let isDir, isFile;
        const stats = fs.lstat(`${startingPoint}/${file}`, (err, stats) => {
          isDir = stats.isDirectory();
          isFile = stats.isFile();
          if (isFile && path.extname(file) === '.jsx') {
            let newFileName = file.substring(0, file.lastIndexOf('.')) + '.js';
            renameIt(`${startingPoint}/${file}`, `${startingPoint}/${newFileName}`);
          } else if (isDir && file !== excludeFolder) {
            crawlFiles(`${startingPoint}/${file}`)
          }
        });
      })
    }
  })
}

crawlFiles(__dirname, 'node_modules');
