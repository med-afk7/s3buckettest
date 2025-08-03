require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');

// Load credentials from .env
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Path to your image
const filePath = path.join(__dirname, 'cat.png'); // <-- change this to your image
const fileStream = fs.createReadStream(filePath);
fileStream.on('error', err => console.error('File error:', err));

const uploadParams = {
  Bucket: process.env.S3_BUCKET,
  Key: 'cat.png', // how it appears in S3 (folder/key)
  Body: fileStream,
  ContentType: 'image/png',
};

s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.error('Upload failed:', err);
  } else {
    console.log('✅ Upload successful!');
    console.log('🌐 File URL:', data.Location);
  }
});
