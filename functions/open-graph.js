const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
  const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;
  console.log(`Taking screenshot of ${pageToScreenshot}`);

  console.log('creating browser...');
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox'],
  });

  console.log('creating page...');
  console.log(browser);
  const page = await browser.newPage();

  console.log(`navigating to ${pageToScreenshot}...`);
  await page.goto(pageToScreenshot);

  console.log('taking screenshot...');
  const screenshot = await page.screenshot({ encoding: 'binary' });

  console.log('closing browser...');
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
