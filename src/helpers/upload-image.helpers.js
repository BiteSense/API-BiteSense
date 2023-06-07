const googlCloud = require("../configs/cloud-storage.configs");
const util = require("util");

const bucketName = "staging_product";

const bucket = googlCloud.bucket(bucketName);

const { format } = util;

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname.replace(/ /g, "_"));

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);
      })
      .on("error", () => {
        reject("Failed to upload image, something wrong");
      })
      .end(buffer);
  });

module.exports = uploadImage;
