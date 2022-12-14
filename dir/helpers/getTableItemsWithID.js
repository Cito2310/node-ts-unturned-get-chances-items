"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableItemsWithID = void 0;
const getItemsData_1 = require("./getItemsData");
const getTableData_1 = require("./getTableData");
const replaceData_1 = require("./replaceData");
const getTableItemsWithID = (pathItems, pathTable, id, dataTable, parentWeight = 100) => {
    const itemsData = (0, getItemsData_1.getItemsData)(pathItems);
    const tableData = (0, getTableData_1.getTableData)(pathTable);
    const replaceItemsTable = (0, replaceData_1.replaceData)(itemsData, tableData);
    const itemsArray = dataTable.find(item => item.id == id);
    let resultArr = [];
    const sumWeight = itemsArray.children.reduce((valueOld, current) => valueOld + current.weight, 0);
    itemsArray.children.forEach((item) => {
        const weightPercentaje = ((item.weight * 100 / sumWeight) / 100 * parentWeight / 100) * 100;
        if (item.children) {
            resultArr.push((0, exports.getTableItemsWithID)(pathItems, pathTable, item.id, replaceItemsTable, weightPercentaje));
        }
        if (item.folder) {
            item.chances = weightPercentaje;
            resultArr.push(item);
        }
    });
    return resultArr;
};
exports.getTableItemsWithID = getTableItemsWithID;
const ItemsWithId = getItemsWithID(59007, replaceItemsTable).flat(99);
fs.writeFileSync(`./out/unturned-${uuidv4()}.json`, JSON.stringify(ItemsWithId));
