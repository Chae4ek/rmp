import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import { Browser } from 'puppeteer';

export async function parse(
  headless: boolean,
  parse: (browser: Browser, prefix: string) => Promise<void>,
  prefix: string,
) {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  const browser = await puppeteer.launch({
    headless: headless ? 'new' : false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-size=640,480',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
    ],
  });

  try {
    await parse(browser, prefix);
  } catch (e) {
    console.error('srape failed', e);
  } finally {
    if (headless) {
      await browser?.close();
    }
  }
}
