const cloud_storage = require("@google-cloud/storage");
const path = require("path");

// Get Service Key
const service_key = path.join(__dirname, "../keys/serviceKeys.json");

const { Storage } = cloud_storage;

const storage = new Storage({
  keyFilename: service_key,
  projectId: process.env.PROJECT_ID,
});

module.exports = storage;
