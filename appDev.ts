import { getProperties } from './helpers/getProperties';
import fs from 'fs';

const itemsData = getProperties("./assets/Items");

console.log(itemsData)

fs.writeFileSync("properties.json", JSON.stringify(itemsData))