import { parse } from './src/parser';
import { step1 } from './src/step1';
import { step2 } from './src/step2';
import { step3 } from './src/step3';
import { step4 } from './src/step4';
import { step5 } from './src/step5';
import { step6 } from './src/step6';

const regions = [
  '', // Москва
  'spb.', // Санкт-Петербург
  'ekaterinburg.', // Екатеринбург
  'ufa.', // Уфа
  'krasnodar.', // Краснодар
  'tyumen.', // Тюмень
  'kazan.', // Казань
  'nn.', // Нижний Новгород
  'omsk.', // Омск
  'vladivostok.', // Владивосток
];
const regionNames = [
  'Москва',
  'Санкт-Петербург',
  'Екатеринбург',
  'Уфа',
  'Краснодар',
  'Тюмень',
  'Казань',
  'Нижний Новгород',
  'Омск',
  'Владивосток',
];

const config = {
  strict: false,
  test: true, // only outputs steps that should've been run
  enableGettingLinks: false, // if strict is false, enables everything
  enableParsingLinks: true, // if strict is false, enables both converting to csv
  enableConvertingToGeneralCSVData: false,
  enableConvertingToPricingCSVData: false, // if strict is false, enables updating pricing csv
  enableUpdatingGeneralCSVData: false,
  enableUpdatingPricingCSVData: false,
};
type Config = typeof config;

for (let i = 2; i < process.argv.length; ++i) {
  const arg = process.argv[i];
  if (arg === 'step1') config.enableGettingLinks = true;
  if (arg === 'step2') config.enableGettingLinks = true;
  if (arg === 'step3') config.enableGettingLinks = true;
}

run(config);

async function run(cfg: Config) {
  const runStep1 = cfg.enableGettingLinks;
  const runStep2 = (!cfg.strict && runStep1) || cfg.enableParsingLinks;
  const runStep3 = (!cfg.strict && runStep2) || cfg.enableConvertingToGeneralCSVData;
  const runStep4 = (!cfg.strict && runStep2) || cfg.enableConvertingToPricingCSVData;
  const runStep5 = (!cfg.strict && runStep3) || cfg.enableUpdatingGeneralCSVData;
  const runStep6 = (!cfg.strict && runStep4) || cfg.enableUpdatingPricingCSVData;

  if (cfg.test) {
    if (runStep1) console.log(`Step 1 is running - getting links...                     (Test)`);
    if (runStep2) console.log(`Step 2 is running - getting data from links...           (Test)`);
    if (runStep3) console.log(`Step 3 is running - converting general data to CSV...    (Test)`);
    if (runStep4) console.log(`Step 4 is running - converting pricing data to CSV...    (Test)`);
    if (runStep5) console.log(`Step 5 is running - updating general data...             (Test)`);
    if (runStep6) console.log(`Step 6 is running - updating pricing data...             (Test)`);
    return;
  }

  for (let i = 0; i < regions.length; ++i) {
    console.log(`Running for '${regionNames[i]}' region...`);

    // get links
    if (runStep1) {
      console.log(`Step 1 is running - getting links...                     (${regionNames[i]})`);
      await parse(true, step1, regions[i]);
    }

    // go through all links and get data
    if (runStep2) {
      console.log(`Step 2 is running - getting data from links...           (${regionNames[i]})`);
      await parse(true, step2, regions[i]);
    }

    (async function () {
      await (async function () {
        // convert general data to CSV
        if (runStep3) {
          console.log(
            `Step 3 is running - converting general data to CSV...    (${regionNames[i]})`,
          );
          step3(regions[i], regionNames[i], /* use general raw data */ false);
        }
        // convert price data to CSV
        if (runStep4) {
          console.log(
            `Step 4 is running - converting pricing data to CSV...    (${regionNames[i]})`,
          );
          step4(regions[i], regionNames[i], /* use general raw data */ false);
        }
      })();

      await (async function () {
        // update existing general data
        if (runStep5) {
          console.log(
            `Step 5 is running - updating general data...             (${regionNames[i]})`,
          );
          step5(regionNames[i]);
        }
        // update existing pricing data
        if (runStep6) {
          console.log(
            `Step 6 is running - updating pricing data...             (${regionNames[i]})`,
          );
          step6(regionNames[i]);
        }
      })();
    })();
  }
}
