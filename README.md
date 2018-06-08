# upload-service

Walk-through is here: https://extranet.atlassian.com/display/FIL/Hiring%3A+Coding+Test

A simple file uploading service.

This service provides three endpoints:

 - GET /api/file to list all the files
 - POST /api/file to upload a new file (binary upload)
 - GET /api/file/:fileId to get a file binary.
 
The binary are stored on the local disk in the configured data directory.
The metadata is stored in memory.

Start the service by running `npm start` from the project root.

The service listens on port http://localhost:8080 per default.