'use strict';

module.exports = class FileRepositoryMemory {
  constructor() {
    this._filesById = {};
  }

  list() {
    const files = this._filesById;
    return Promise.resolve(files);
  }

  get(file) {
    const resolvedFile = this._filesById[file.getId()];
    if (resolvedFile) {
      return Promise.resolve(resolvedFile);
    } else {
      return Promise.reject(new Error('file not found'));
    }
  }

  addFile(file) {
    this._filesById[file.getId()] = file;
    return Promise.resolve(file);
  }
}
