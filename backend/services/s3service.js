// Remember to install dependencies: npm install aws-sdk

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToS3 = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `images/${file.name}`, // Example: images/filename.jpg
    Body: file.data,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

module.exports = { uploadToS3 };
