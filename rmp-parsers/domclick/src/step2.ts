import { Browser } from 'puppeteer';
import { FileWriter, FileReader } from './utils';
import fs from 'fs';

// continue from skipLink if there was a failure
let skip = false;
const skipLink = 'https://domclick.ru/card/sale__flat__1820959404';

export async function step2(browser: Browser, prefix: string) {
  const linksReader = new FileReader(`./res/links/${prefix}-links.json`);
  const linksString = linksReader.readFromFile();
  linksReader.close();
  const links = linksString.split(',');

  const time = new Date().getDate();
  if (!fs.existsSync(`./res/raw/time-${time}/`)) {
    fs.mkdirSync(`./res/raw/time-${time}/`);
  }
  const dataWriter = new FileWriter(`./res/raw/time-${time}/${prefix}-raw-data.json`, skip);

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  for (const link of links) {
    if (link === '') continue;
    if (skip && link !== skipLink) continue;
    if (skip && link === skipLink) {
      skip = false;
      continue;
    }

    let count = 3;
    while (count > 0) {
      try {
        await page.goto(link);

        await page.waitForFunction(`window.__SSR_STATE__`);
        const __SSR_STATE__ = await page.evaluate(`window.__SSR_STATE__`);

        console.log(`writing to file link ${link}`);

        dataWriter.writeToFile(JSON.stringify(__SSR_STATE__), '\n', `error link ${link}`);

        count = 0;
      } catch (e) {
        count--;
      }
    }
  }
  dataWriter.close();
}
