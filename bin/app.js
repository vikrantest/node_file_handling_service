#!/usr/bin/env node

'use strict';

const express = require('express');
const config = require('../config.json');
const FileServiceLocal = require('../src/services/file_service_local.js');
const FileRepositoryMemory = require('../src/repositories/file_repository_memory.js');
const ApiInteractor = require('../src/interactors/api_interactor.js');
const File = require('../src/entities/file.js');
const crypto = require('crypto');

const fileService = new FileServiceLocal(config);
const fileRepository = new FileRepositoryMemory(config);
const apiInteractor = new ApiInteractor(fileRepository, fileService);

const app = express();

app.get('/api/file', (req, res) => {
  apiInteractor.listFiles()
    .then((files) => {
      var output = [];

      for(var key in files){
        output.push(files[key])
      }

      return res.json({ data: output });
    })
    .catch((err) => {
      console.error(err.stack);
      return res.sendStatus(500);
    });
});

app.post('/api/file', (req, res) => {
  const contentType = req.header('content-type');

  apiInteractor.uploadFile(req, contentType)
    .then((file) => {
      res.json({ data: file });
    })
    .catch((err) => {
      console.error(err.stack);
      return res.sendStatus(500);
    });
});

app.get('/api/file/:fileId', (req, res) => {
  const file = new File(req.params.fileId);

  apiInteractor.downloadFile(file)
    .then((result) => {
      res.set('Content-Type', result.contentType);
      res.set('etag','test');
      result.stream.pipe(res);
    })
    .catch((err) => {
      console.error(err.message,'+++++++++');
      if(err.message === 'file not found'){
        return res.sendStatus(404)

      }
      else{
        return res.sendStatus(500);
      }
      
    });
});

app.listen(config.port, () => {
  console.log(`service listening on port ${config.port}`);
});
