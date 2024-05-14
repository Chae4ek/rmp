import { FileWriter, FileReader } from './utils';
import fs from 'fs';

export async function step6(region: string) {
  const time = new Date().getDate();
  if (!fs.existsSync(`./res/prices/time-${time}/${region}_domclick_dataset.csv`)) {
    return;
  }
  if (!fs.existsSync(`./res/prices/${region}_domclick_dataset.csv`)) {
    return;
  }

  const newDataReader = new FileReader(`./res/prices/time-${time}/${region}_domclick_dataset.csv`);
  const newData = newDataReader.readFromFile();
  newDataReader.close();
  const oldDataReader = new FileReader(`./res/prices/${region}_domclick_dataset.csv`);
  const oldData = oldDataReader.readFromFile();
  oldDataReader.close();

  const newDataCSV = newData.split(/;|\n/g);
  const oldDataCSV = oldData.split(/;|\n/g);

  interface DataType {
    date: string;
    price: string;
  }
  const newDataMap: Map<string, Set<DataType>> = new Map();
  for (let i = 3; i < newDataCSV.length; i += 3) {
    newDataMap[newDataCSV[i]] ??= new Set();
    newDataMap[newDataCSV[i]].add({ date: newDataCSV[i + 1], price: newDataCSV[i + 2] });
    newDataMap.set(newDataCSV[i], newDataMap[newDataCSV[i]]);
  }

  // comparing new data to the old one
  const hasSame = (set: Set<DataType>, el: DataType) =>
    [...set].find((x: DataType) => el.date == x.date && el.price == x.price) !== undefined;

  for (let i = 3; i < oldDataCSV.length; i += 3) {
    const data = { date: oldDataCSV[i + 1], price: oldDataCSV[i + 2] };
    newDataMap[oldDataCSV[i]] ??= new Set();

    if (!hasSame(newDataMap[oldDataCSV[i]], data)) {
      newDataMap[oldDataCSV[i]].add(data);
      newDataMap.set(oldDataCSV[i], newDataMap[oldDataCSV[i]]);
      console.log(`diff in ${oldDataCSV[i]} with date ${data.date} and price ${data.price}`);
    }
  }

  // writing new data to the root
  const dataWriter = new FileWriter(`./res/prices/${region}_domclick_dataset.csv`, false);

  dataWriter.writeToFileSync('id', ';');
  dataWriter.writeToFileSync('date', ';');
  dataWriter.writeToFileSync('price', '\n');

  for (const [id, values] of newDataMap) {
    if (id === '') continue;
    for (const data of values) {
      dataWriter.writeToFileSync(id, ';');
      dataWriter.writeToFileSync(data.date.toString(), ';');
      dataWriter.writeToFileSync(data.price.toString(), '\n');
    }
  }

  dataWriter.close();
}
