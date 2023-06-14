const google_cloud = require("../configs/cloud-storage.configs");
const util = require("util");

const bucket_name = process.env.BUCKET_NAME;

const bucket = google_cloud.bucket(bucket_name);

const { format } = util;

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname.replace(/ /g, "_"));

    const blob_stream = blob.createWriteStream({
      resumable: false,
    });

    blob_stream
      .on("finish", () => {
        const public_url = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(public_url);
      })
      .on("error", () => {
        reject("Failed to upload image, something wrong");
      })
      .end(buffer);
  });

module.exports = uploadImage;
