'use strict';

const uuid = require('uuid');

module.exports = class File {
  constructor(id) {
    this._id = id;
    this._storageLocation = null;
    this._contentType = null;
  }

  getId() {
    return this._id;
  }

  getStorageLocation() {
    return this._storageLocation;
  }

  getContentType() {
    return this._contentType;
  }

  static generate() {
    return new File(uuid.v4());
  }

  toJSON() {
    return {
      id: this._id,
      contentType: this._contentType
    };
  }

  addStorageLocation(location) {
    this._storageLocation = location;
  }

  addContentType(contentType) {
    this._contentType = contentType;
  }
}
