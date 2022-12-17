import clc from "cli-color";
import prompts from 'prompts';
import fs from 'fs';

import { getItemsData, getTableItemsWithID } from './';
import { getTableDataSimple } from './getTableDataSimple';
import { getTableData } from './getTableData';
import { replaceData } from './replaceData';


const headerMenu = (title: string) => {
    const length = 50
    const space = " ".repeat(3)
    const halfRod = "|".repeat( ( (length - ( title.length + space.length*2 )) / 2 ) )
    const completeRod = "|".repeat(length)

    console.log(clc.green("\n"+completeRod))
    console.log(clc.green(halfRod + space + " ".repeat(title.length) + space + halfRod))
    console.log(clc.green(halfRod + space + title + space + halfRod))
    console.log(clc.green(halfRod + space + " ".repeat(title.length) + space + halfRod))
    console.log(clc.green(completeRod+"\n"))
}

export const mainMenu = async() => {
    headerMenu(" UNTURNED GET DATA");

    const {value}: {value: number} = await prompts({
        type: "select",
        message: "Seleccione una opcion",
        name: "value",
        choices: [
            { title: `${clc.green("1. ")}Obtener los items y sus probabilidades`, description: "Necesitas el ID de la tabla.", value: 1},
            { title: `${clc.green("2. ")}Obtener todas las tablas`, description: "", value: 2},
            { title: `${clc.green("3. ")}Obtener todos los items`, description: "", value: 3},
            { title: `${clc.green("4. ")}Obtener todos las tablas y sus items`, description: "", value: 4},
            { title: `${clc.green("0. ")}Salir de la aplicacion`, description: "", value: 0},
        ]
    });
    return value;
}


export const ItemsWithIdMenu = async(pathItem: string, pathTable: string) => {
    headerMenu("GET ITEMS WITH ID");

    const {id}: {id: number} = await prompts({
        type: "text",
        message: "Introducir el ID de la tabla",
        name: "id",
    });

    fs.writeFileSync(`./out/items-${id}.json` ,JSON.stringify((await getTableItemsWithID(pathItem, pathTable, id)).flat(99)));
}


export const AllItemsMenu = async(path: string) => {
    headerMenu("ALL ITEMS");

    const allData = getItemsData(path).flat(99)

    fs.writeFileSync("./out/all-items.json", JSON.stringify(allData))
}

export const AllTablesMenu = async(path: string) => {
    headerMenu("ALL TABLES SPAWN");

    fs.writeFileSync(`./out/all-tables.json`, JSON.stringify(getTableDataSimple(path)));
}

export const AllTablesWithItemsMenu = async(pathItems: string, pathTables: string) => {
    headerMenu("ALL TABLES SPAWN WITH ITEMS");

    const itemsData = getItemsData(pathItems);
    const tablesData = getTableData(pathTables)

    fs.writeFileSync(`./out/all-tables-items.json`, JSON.stringify(replaceData(itemsData, tablesData)));
}

export const errorMenu = async() => {
    console.log(clc.red("|||||||||||||||||||  E R R O R  |||||||||||||||||||"))
    console.log(clc.red("|||||||||||||||  I D   V A L I D O  |||||||||||||||"))
}

export const pause = async() => {
    errorMenu();

    await prompts({
        type: "text",
        message: "Presiona ENTER para continuar",
        name: "x"
    })
}