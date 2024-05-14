import { Page, Browser } from 'puppeteer';
import { FileWriter } from './utils';

export async function step1(browser: Browser, prefix: string) {
  const linkWriter = new FileWriter(`./res/links/${prefix}-links.json`, false);

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  const pageCount = 100;

  for (let i = 1; i <= pageCount; ++i) {
    let count = 3;
    while (count > 0) {
      try {
        gotoPage(page, i, prefix);

        // FIXME: +- a few responses
        const links = await parseLink(page, '.a4tiB2');

        console.log(`writing ${links.length} links prices on page ${i}...`);

        let linksData = '';
        for (let j = 0; j < links.length; ++j) {
          linksData += `${links[j]},`;
        }
        linkWriter.writeToFile(linksData, '\n', links);

        count = 0;
      } catch (e) {
        count--;
      }
    }
  }

  linkWriter.close();
}

async function gotoPage(page: Page, pageNumber: number, prefix: string) {
  await page.goto(`https://${prefix}domclick.ru/pokupka/kvartiry/vtorichka?page=${pageNumber}`);
}

async function parseLink(page: Page, selector: string) {
  await page.waitForSelector(selector);
  return await page.$$eval(selector, (elements) => {
    const data: (string | null)[] = [];
    for (const e of elements) {
      data.push(e.getAttribute('href'));
    }
    return data;
  });
}
