'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const crypto = require('crypto');

module.exports = class FileServiceLocal {
  constructor(config) {
    this._config = config;
  }

  uploadBinary(readStream, contentType) {
    const storageLocation = this._config.storageLocation;
    return new Promise((resolve, reject) => {
      const filePath = path.join(storageLocation, uuid.v4());
      const writeStream = fs.createWriteStream(filePath);
      var hash = crypto.createHash('sha1');
      writeStream.on('finish', () => {
        
        var hashDigest = hash.digest('hex');
        console.log(hashDigest);
        resolve(filePath);
  
      });
      readStream.on('data',(dataset) =>{
        hash.update(dataset);

      })
      writeStream.on('error', (err) => {
        reject(err);
      });
      readStream.pipe(writeStream);
    });
  }

  downloadBinary(location) {
    const readStream = fs.createReadStream(location);
    return Promise.resolve(readStream);
  }
}
