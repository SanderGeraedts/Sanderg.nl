const cloudinary = require('cloudinary').v2; // Make sure to use v2
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, FAUNA_SECRET } = process.env;

const uploadToCloudinary = async (screenshot) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const uploadOptions = {};
    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(screenshot);
  });
};

exports.handler = async (event, context) => {
  const screenshot = JSON.parse(event.body).screenshot;

  console.log(screenshot);

  const cloudinaryResponse = await uploadToCloudinary(screenshot);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: cloudinaryResponse,
    }),
  };
};
