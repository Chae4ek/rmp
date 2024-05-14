import { FileWriter, FileReader } from './utils';
import fs from 'fs';

export async function step3(prefix: string, region: string, useGeneralRawData: boolean) {
  const time = new Date().getDate();
  if (!fs.existsSync(`./res/raw/time-${time}/`)) {
    fs.mkdirSync(`./res/raw/time-${time}/`);
  }
  const path = useGeneralRawData
    ? `./res/raw/${prefix}-raw-data.json`
    : `./res/raw/time-${time}/${prefix}-raw-data.json`;
  const dataReader = new FileReader(path);
  const dataString = dataReader.readFromFile();
  dataReader.close();

  if (!fs.existsSync(`./res/done/time-${time}/`)) {
    fs.mkdirSync(`./res/done/time-${time}/`);
  }
  const dataWriter = new FileWriter(`./res/done/time-${time}/${region}_domclick_dataset.csv`, false);

  dataWriter.writeToFileSync('id', ';');
  dataWriter.writeToFileSync('region', ';');
  dataWriter.writeToFileSync('address', ';');
  dataWriter.writeToFileSync('latitude', ';');
  dataWriter.writeToFileSync('longitude', ';');
  dataWriter.writeToFileSync('price', ';');

  dataWriter.writeToFileSync('house_floors', ';');
  dataWriter.writeToFileSync('house_buildYear', ';');
  dataWriter.writeToFileSync('house_ceilingHeight', ';');
  dataWriter.writeToFileSync('house_hasGarbageDisposer', ';');
  dataWriter.writeToFileSync('house_liftsFreight', ';');
  dataWriter.writeToFileSync('house_liftsPassenger', ';');
  dataWriter.writeToFileSync('house_wallType', ';');
  dataWriter.writeToFileSync('house_areaCommonPropery', ';');
  dataWriter.writeToFileSync('house_areaNonResidential', ';');
  dataWriter.writeToFileSync('house_areaResidential', ';');
  dataWriter.writeToFileSync('house_basementArea', ';');
  dataWriter.writeToFileSync('house_chuteCount', ';');
  dataWriter.writeToFileSync('house_coldWaterType', ';');
  dataWriter.writeToFileSync('house_electricalEntriesCount', ';');
  dataWriter.writeToFileSync('house_electricalType', ';');
  dataWriter.writeToFileSync('house_elevatorsCount', ';');
  dataWriter.writeToFileSync('house_energyEfficiency', ';');
  dataWriter.writeToFileSync('house_entranceCount', ';');
  dataWriter.writeToFileSync('house_fireFightingType', ';');
  dataWriter.writeToFileSync('house_floorType', ';');
  dataWriter.writeToFileSync('house_foundationType', ';');
  dataWriter.writeToFileSync('house_heatingType', ';');
  dataWriter.writeToFileSync('house_parkingSquare', ';');
  dataWriter.writeToFileSync('house_sewerageCesspoolsVolume', ';');
  dataWriter.writeToFileSync('house_sewerageType', ';');
  dataWriter.writeToFileSync('house_ventilationType', ';');

  dataWriter.writeToFileSync('saleType', ';');

  dataWriter.writeToFileSync('objectInfo_rooms', ';');
  dataWriter.writeToFileSync('objectInfo_area', ';');
  dataWriter.writeToFileSync('objectInfo_kitchenArea', ';');
  dataWriter.writeToFileSync('objectInfo_livingArea', ';');
  dataWriter.writeToFileSync('objectInfo_floor', ';');
  dataWriter.writeToFileSync('objectInfo_connectedBathrooms', ';');
  dataWriter.writeToFileSync('objectInfo_separatedBathrooms', ';');
  dataWriter.writeToFileSync('objectInfo_balconies', ';');
  dataWriter.writeToFileSync('objectInfo_hasGas', ';');
  dataWriter.writeToFileSync('objectInfo_renovation', ';');
  dataWriter.writeToFileSync('objectInfo_loggias', '\n'); //! \n -> ;

  dataString.split(/\r?\n/).forEach((line) => {
    if (line === '') return;
    const data = JSON.parse(line);
    const p = data.productCard;
    dataWriter.writeToFileSync(p._id, ';');
    dataWriter.writeToFileSync(region, ';');
    dataWriter.writeToFileSync(p.address.name, ';');
    dataWriter.writeToFileSync(p.address.position.lat, ';');
    dataWriter.writeToFileSync(p.address.position.lon, ';');
    dataWriter.writeToFileSync(p.priceInfo.price, ';');

    dataWriter.writeToFileSync(p.house.info.floors, ';');
    dataWriter.writeToFileSync(p.house.info.buildYear, ';');
    dataWriter.writeToFileSync(p.house.info.ceilingHeight, ';');
    dataWriter.writeToFileSync(p.house.info.hasGarbageDisposer, ';');
    dataWriter.writeToFileSync(p.house.info.liftsFreight, ';');
    dataWriter.writeToFileSync(p.house.info.liftsPassenger, ';');
    dataWriter.writeToFileSync(p.house.info.wallType, ';');
    dataWriter.writeToFileSync(p.house.info.areaCommonPropery, ';');
    dataWriter.writeToFileSync(p.house.info.areaNonResidential, ';');
    dataWriter.writeToFileSync(p.house.info.areaResidential, ';');
    dataWriter.writeToFileSync(p.house.info.basementArea, ';');
    dataWriter.writeToFileSync(p.house.info.chuteCount, ';');
    dataWriter.writeToFileSync(p.house.info.coldWaterType, ';');
    dataWriter.writeToFileSync(p.house.info.electricalEntriesCount, ';');
    dataWriter.writeToFileSync(p.house.info.electricalType, ';');
    dataWriter.writeToFileSync(p.house.info.elevatorsCount, ';');
    dataWriter.writeToFileSync(p.house.info.energyEfficiency, ';');
    dataWriter.writeToFileSync(p.house.info.entranceCount, ';');
    dataWriter.writeToFileSync(p.house.info.fireFightingType, ';');
    dataWriter.writeToFileSync(p.house.info.floorType, ';');
    dataWriter.writeToFileSync(p.house.info.foundationType, ';');
    dataWriter.writeToFileSync(p.house.info.heatingType, ';');
    dataWriter.writeToFileSync(p.house.info.parkingSquare, ';');
    dataWriter.writeToFileSync(p.house.info.sewerageCesspoolsVolume, ';');
    dataWriter.writeToFileSync(p.house.info.sewerageType, ';');
    dataWriter.writeToFileSync(p.house.info.ventilationType, ';');

    dataWriter.writeToFileSync(p.legalOptions.saleType, ';');

    dataWriter.writeToFileSync(p.objectInfo.rooms, ';');
    dataWriter.writeToFileSync(p.objectInfo.area, ';');
    dataWriter.writeToFileSync(p.objectInfo.kitchenArea, ';');
    dataWriter.writeToFileSync(p.objectInfo.livingArea, ';');
    dataWriter.writeToFileSync(p.objectInfo.floor, ';');
    dataWriter.writeToFileSync(p.objectInfo.connectedBathrooms, ';');
    dataWriter.writeToFileSync(p.objectInfo.separatedBathrooms, ';');
    dataWriter.writeToFileSync(p.objectInfo.balconies, ';');
    dataWriter.writeToFileSync(p.objectInfo.hasGas, ';');
    dataWriter.writeToFileSync(p.objectInfo.renovation, ';');
    dataWriter.writeToFileSync(p.objectInfo.loggias, '\n'); //! \n -> ;
  });

  dataWriter.close();
}
