const chromium = require('chrome-aws-lambda');
const fetch = require('node-fetch');

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
  return await fetch(`/.netlify/functions/cloudinary-uploader`, {
    method: 'POST',
    body: JSON.stringify({
      screenshot,
    }),
  });
};

exports.handler = async (event, context) => {
  const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

  const screenshot = await takeScreenshot(pageToScreenshot);

  const cloudinaryResponse = await uploadToCloudinary(screenshot).data;

  console.log(`Created screenshot of ${pageToScreenshot}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot of ${pageToScreenshot}`,
      response: cloudinaryResponse,
    }),
  };
};
