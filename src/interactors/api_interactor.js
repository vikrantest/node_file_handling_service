'use strict';

const File = require('../entities/file.js');

module.exports = class ApiInteractor {
  constructor(fileRepository, fileService) {
    this._fileRepository = fileRepository;
    this._fileService = fileService;
  }

  listFiles() {
    return this._fileRepository.list();
  }

  uploadFile(stream, contentType) {
    return this._fileService
      .uploadBinary(stream, contentType)
      .then((location) => {
        const file = File.generate();
        file.addContentType(contentType);
        file.addStorageLocation(location);
        return this._fileRepository.addFile(file);
      });
  }

  downloadFile(file) {
    return this._fileRepository
      .get(file)
      .then((savedFile) => {
        return this._fileService.downloadBinary(savedFile.getStorageLocation())
          .then((stream) => {
            return {
              stream: stream,
              contentType: savedFile.getContentType()
            };
          });
      });
  }
}
