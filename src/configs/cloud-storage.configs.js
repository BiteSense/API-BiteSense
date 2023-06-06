const Cloud = require("@google-cloud/storage");
const path = require("path");

// Get Service Key
const serviceKey = path.join(__dirname, "../keys/serviceKeys.json");

const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID,
});

module.exports = storage;
