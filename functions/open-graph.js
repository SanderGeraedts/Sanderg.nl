const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
  const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;
  console.log(`Taking screenshot of ${pageToScreenshot}`);

  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto(pageToScreenshot);

  const screenshot = await page.screenshot({ encoding: 'binary' });

  await browser.close();

  console.log(`Complete screenshot of ${pageToScreenshot}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot of ${pageToScreenshot}`,
      buffer: screenshot,
    }),
  };
};
