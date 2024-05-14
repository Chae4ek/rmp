import { FileWriter, FileReader } from './utils';
import fs from 'fs';

export async function step5(region: string) {
  const time = new Date().getDate();
  if (!fs.existsSync(`./res/done/time-${time}/${region}_domclick_dataset.csv`)) {
    return;
  }
  if (!fs.existsSync(`./res/done/${region}_domclick_dataset.csv`)) {
    return;
  }

  const newDataReader = new FileReader(`./res/done/time-${time}/${region}_domclick_dataset.csv`);
  const newData = newDataReader.readFromFile();
  newDataReader.close();
  const oldDataReader = new FileReader(`./res/done/${region}_domclick_dataset.csv`);
  const oldData = oldDataReader.readFromFile();
  oldDataReader.close();

  const newDataCSV = newData.split(/;|\n/g);
  const oldDataCSV = oldData.split(/;|\n/g);

  interface DataType {
    id: string;
    region: string;
    name: string;
    lat: string;
    lon: string;
    price: string;
    floors: string;
    buildYear: string;
    ceilingHeight: string;
    hasGarbageDisposer: string;
    liftsFreight: string;
    liftsPassenger: string;
    wallType: string;
    areaCommonPropery: string;
    areaNonResidential: string;
    areaResidential: string;
    basementArea: string;
    chuteCount: string;
    coldWaterType: string;
    electricalEntriesCount: string;
    electricalType: string;
    elevatorsCount: string;
    energyEfficiency: string;
    entranceCount: string;
    fireFightingType: string;
    floorType: string;
    foundationType: string;
    heatingType: string;
    parkingSquare: string;
    sewerageCesspoolsVolume: string;
    sewerageType: string;
    ventilationType: string;
    saleType: string;
    rooms: string;
    area: string;
    kitchenArea: string;
    livingArea: string;
    floor: string;
    connectedBathrooms: string;
    separatedBathrooms: string;
    balconies: string;
    hasGas: string;
    renovation: string;
    loggias: string;
  }
  const newDataMap: Map<string, Set<DataType>> = new Map();
  for (let i = 0; i < newDataCSV.length; i += 44) {
    newDataMap[newDataCSV[i]] ??= new Set();
    newDataMap[newDataCSV[i]].add({
      id: newDataCSV[i],
      region: newDataCSV[i + 1],
      name: newDataCSV[i + 2],
      lat: newDataCSV[i + 3],
      lon: newDataCSV[i + 4],
      price: newDataCSV[i + 5],
      floors: newDataCSV[i + 6],
      buildYear: newDataCSV[i + 7],
      ceilingHeight: newDataCSV[i + 8],
      hasGarbageDisposer: newDataCSV[i + 9],
      liftsFreight: newDataCSV[i + 10],
      liftsPassenger: newDataCSV[i + 11],
      wallType: newDataCSV[i + 12],
      areaCommonPropery: newDataCSV[i + 13],
      areaNonResidential: newDataCSV[i + 14],
      areaResidential: newDataCSV[i + 15],
      basementArea: newDataCSV[i + 16],
      chuteCount: newDataCSV[i + 17],
      coldWaterType: newDataCSV[i + 18],
      electricalEntriesCount: newDataCSV[i + 19],
      electricalType: newDataCSV[i + 20],
      elevatorsCount: newDataCSV[i + 21],
      energyEfficiency: newDataCSV[i + 22],
      entranceCount: newDataCSV[i + 23],
      fireFightingType: newDataCSV[i + 24],
      floorType: newDataCSV[i + 25],
      foundationType: newDataCSV[i + 26],
      heatingType: newDataCSV[i + 27],
      parkingSquare: newDataCSV[i + 28],
      sewerageCesspoolsVolume: newDataCSV[i + 29],
      sewerageType: newDataCSV[i + 30],
      ventilationType: newDataCSV[i + 31],
      saleType: newDataCSV[i + 32],
      rooms: newDataCSV[i + 33],
      area: newDataCSV[i + 34],
      kitchenArea: newDataCSV[i + 35],
      livingArea: newDataCSV[i + 36],
      floor: newDataCSV[i + 37],
      connectedBathrooms: newDataCSV[i + 38],
      separatedBathrooms: newDataCSV[i + 39],
      balconies: newDataCSV[i + 40],
      hasGas: newDataCSV[i + 41],
      renovation: newDataCSV[i + 42],
      loggias: newDataCSV[i + 43],
    });
    newDataMap.set(newDataCSV[i], newDataMap[newDataCSV[i]]);
  }

  // comparing new data to the old one
  const hasSame = (set: Set<DataType>, el: DataType) =>
    [...set].find((x: DataType) => el.id == x.id) !== undefined;

  for (let i = 0; i < oldDataCSV.length; i += 44) {
    const data = {
      id: oldDataCSV[i],
      region: oldDataCSV[i + 1],
      name: oldDataCSV[i + 2],
      lat: oldDataCSV[i + 3],
      lon: oldDataCSV[i + 4],
      price: oldDataCSV[i + 5],
      floors: oldDataCSV[i + 6],
      buildYear: oldDataCSV[i + 7],
      ceilingHeight: oldDataCSV[i + 8],
      hasGarbageDisposer: oldDataCSV[i + 9],
      liftsFreight: oldDataCSV[i + 10],
      liftsPassenger: oldDataCSV[i + 11],
      wallType: oldDataCSV[i + 12],
      areaCommonPropery: oldDataCSV[i + 13],
      areaNonResidential: oldDataCSV[i + 14],
      areaResidential: oldDataCSV[i + 15],
      basementArea: oldDataCSV[i + 16],
      chuteCount: oldDataCSV[i + 17],
      coldWaterType: oldDataCSV[i + 18],
      electricalEntriesCount: oldDataCSV[i + 19],
      electricalType: oldDataCSV[i + 20],
      elevatorsCount: oldDataCSV[i + 21],
      energyEfficiency: oldDataCSV[i + 22],
      entranceCount: oldDataCSV[i + 23],
      fireFightingType: oldDataCSV[i + 24],
      floorType: oldDataCSV[i + 25],
      foundationType: oldDataCSV[i + 26],
      heatingType: oldDataCSV[i + 27],
      parkingSquare: oldDataCSV[i + 28],
      sewerageCesspoolsVolume: oldDataCSV[i + 29],
      sewerageType: oldDataCSV[i + 30],
      ventilationType: oldDataCSV[i + 31],
      saleType: oldDataCSV[i + 32],
      rooms: oldDataCSV[i + 33],
      area: oldDataCSV[i + 34],
      kitchenArea: oldDataCSV[i + 35],
      livingArea: oldDataCSV[i + 36],
      floor: oldDataCSV[i + 37],
      connectedBathrooms: oldDataCSV[i + 38],
      separatedBathrooms: oldDataCSV[i + 39],
      balconies: oldDataCSV[i + 40],
      hasGas: oldDataCSV[i + 41],
      renovation: oldDataCSV[i + 42],
      loggias: oldDataCSV[i + 43],
    };
    newDataMap[oldDataCSV[i]] ??= new Set();

    if (!hasSame(newDataMap[oldDataCSV[i]], data)) {
      newDataMap[oldDataCSV[i]].add(data);
      newDataMap.set(oldDataCSV[i], newDataMap[oldDataCSV[i]]);
      console.log(`diff in ${oldDataCSV[i]}`);
    }
  }

  // writing new data to the root
  const dataWriter = new FileWriter(`./res/done/${region}_domclick_dataset.csv`, false);

  for (const [id, values] of newDataMap) {
    if (id === '') continue;
    for (const data of values) {
      dataWriter.writeToFileSync(id, ';');
      dataWriter.writeToFileSync(data.region, ';');
      dataWriter.writeToFileSync(data.name, ';');
      dataWriter.writeToFileSync(data.lat, ';');
      dataWriter.writeToFileSync(data.lon, ';');
      dataWriter.writeToFileSync(data.price, ';');

      dataWriter.writeToFileSync(data.floors, ';');
      dataWriter.writeToFileSync(data.buildYear, ';');
      dataWriter.writeToFileSync(data.ceilingHeight, ';');
      dataWriter.writeToFileSync(data.hasGarbageDisposer, ';');
      dataWriter.writeToFileSync(data.liftsFreight, ';');
      dataWriter.writeToFileSync(data.liftsPassenger, ';');
      dataWriter.writeToFileSync(data.wallType, ';');
      dataWriter.writeToFileSync(data.areaCommonPropery, ';');
      dataWriter.writeToFileSync(data.areaNonResidential, ';');
      dataWriter.writeToFileSync(data.areaResidential, ';');
      dataWriter.writeToFileSync(data.basementArea, ';');
      dataWriter.writeToFileSync(data.chuteCount, ';');
      dataWriter.writeToFileSync(data.coldWaterType, ';');
      dataWriter.writeToFileSync(data.electricalEntriesCount, ';');
      dataWriter.writeToFileSync(data.electricalType, ';');
      dataWriter.writeToFileSync(data.elevatorsCount, ';');
      dataWriter.writeToFileSync(data.energyEfficiency, ';');
      dataWriter.writeToFileSync(data.entranceCount, ';');
      dataWriter.writeToFileSync(data.fireFightingType, ';');
      dataWriter.writeToFileSync(data.floorType, ';');
      dataWriter.writeToFileSync(data.foundationType, ';');
      dataWriter.writeToFileSync(data.heatingType, ';');
      dataWriter.writeToFileSync(data.parkingSquare, ';');
      dataWriter.writeToFileSync(data.sewerageCesspoolsVolume, ';');
      dataWriter.writeToFileSync(data.sewerageType, ';');
      dataWriter.writeToFileSync(data.ventilationType, ';');

      dataWriter.writeToFileSync(data.saleType, ';');

      dataWriter.writeToFileSync(data.rooms, ';');
      dataWriter.writeToFileSync(data.area, ';');
      dataWriter.writeToFileSync(data.kitchenArea, ';');
      dataWriter.writeToFileSync(data.livingArea, ';');
      dataWriter.writeToFileSync(data.floor, ';');
      dataWriter.writeToFileSync(data.connectedBathrooms, ';');
      dataWriter.writeToFileSync(data.separatedBathrooms, ';');
      dataWriter.writeToFileSync(data.balconies, ';');
      dataWriter.writeToFileSync(data.hasGas, ';');
      dataWriter.writeToFileSync(data.renovation, ';');
      dataWriter.writeToFileSync(data.loggias, '\n'); //! \n -> ;
    }
  }

  dataWriter.close();
}
