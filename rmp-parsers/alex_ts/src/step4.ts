import { FileWriter, FileReader } from './utils';
import fs from 'fs';

export async function step4(prefix: string, region: string, useGeneralRawData: boolean) {
  const time = new Date().getDate();
  const path = useGeneralRawData
    ? `./res/raw/${prefix}-raw-data.json`
    : `./res/raw/time-${time}/${prefix}-raw-data.json`;
  const dataReader = new FileReader(path);
  const dataString = dataReader.readFromFile();
  dataReader.close();

  if (!fs.existsSync(`./res/prices/time-${time}/`)) {
    fs.mkdirSync(`./res/prices/time-${time}/`);
  }
  const dataWriter = new FileWriter(
    `./res/prices/time-${time}/${region}_domclick_dataset.csv`,
    false,
  );

  dataWriter.writeToFileSync('id', ';');
  dataWriter.writeToFileSync('date', ';');
  dataWriter.writeToFileSync('price', '\n');

  dataString.split(/\r?\n/).forEach((line) => {
    if (line === '') return;
    const data = JSON.parse(line);
    const p = data.productCard;

    for (const price of p.priceInfo.priceHistory as Array<{
      date: Date;
      price: number;
      diff: number;
      state: string;
    }>) {
      dataWriter.writeToFileSync(p._id, ';');
      dataWriter.writeToFileSync(price.date.toString(), ';');
      dataWriter.writeToFileSync(price.price.toString(), '\n');
    }
  });

  dataWriter.close();
}
