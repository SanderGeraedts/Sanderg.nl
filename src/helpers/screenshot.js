import * as puppeteer from 'puppeteer';
import renamePath from './rename-path.js';

export default async function (permalink, destination) {
  const path = `${destination}/${renamePath(permalink)}.png`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 627,
    deviceScaleFactor: 1,
  });
  await page.goto(permalink, {
    waitUntil: 'networkidle0',
  });

  await page.screenshot({ path });

  await browser.close();

  return path;
}
