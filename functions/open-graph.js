const chromium = require('chrome-aws-lambda');
const cloudinary = require('cloudinary').v2; // Make sure to use v2
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, FAUNA_SECRET } = process.env;

const takeScreenshot = async (pageToScreenshot) => {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.goto(pageToScreenshot);

  const screenshot = await page.screenshot({ encoding: 'binary' });

  await browser.close();

  return screenshot;
};

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
  const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

  const screenshot = await takeScreenshot(pageToScreenshot);

  const cloudinaryResponse = await uploadToCloudinary(screenshot);

  console.log(`Created screenshot of ${pageToScreenshot}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot of ${pageToScreenshot}`,
      response: cloudinaryResponse,
    }),
  };
};
