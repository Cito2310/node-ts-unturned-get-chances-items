import { getItemsData } from './helpers/getItemsData';
import { getTableData } from './helpers/getTableData';
import { replaceData } from './helpers/replaceData';
import { getItemsWithID } from './helpers/getItemsWithID';

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const pathSpawnTable: string = String.raw`.\Spawns`;
const pathItems: string = String.raw`E:\SteamLibrary\steamapps\workshop\content\304930\2683620106\Arid\Bundles\MAIN\Items`;


const itemsData = getItemsData(pathItems)
const tableData = getTableData(pathSpawnTable)
const replaceItemsTable = replaceData(itemsData, tableData)

const ItemsWithId = getItemsWithID(59007, replaceItemsTable).flat(99)

fs.writeFileSync(`./out/unturned-${uuidv4()}.json`, JSON.stringify(ItemsWithId))