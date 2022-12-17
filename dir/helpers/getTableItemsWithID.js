"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableItemsWithID = void 0;
const getItemsData_1 = require("./getItemsData");
const getTableData_1 = require("./getTableData");
const replaceData_1 = require("./replaceData");
const getTableItemsWithID = (pathItems, pathTable, id, parentWeight = 100) => {
    const itemsData = (0, getItemsData_1.getItemsData)(pathItems);
    const tableData = (0, getTableData_1.getTableData)(pathTable);
    const replaceItemsTable = (0, replaceData_1.replaceData)(itemsData, tableData);
    // console.log(replaceItemsTable)
    const getItems = (id, parentWeight = 100) => {
        // @ts-ignore
        const itemsArray = replaceItemsTable.find(item => item.id == id);
        let resultArr = [];
        const sumWeight = itemsArray.children.reduce((valueOld, current) => valueOld + current.weight, 0);
        itemsArray.children.forEach((item) => {
            const weightPercentaje = ((item.weight * 100 / sumWeight) / 100 * parentWeight / 100) * 100;
            if (item.children) {
                resultArr.push(getItems(item.id, weightPercentaje));
            }
            if (item.folder) {
                item.chances = weightPercentaje;
                resultArr.push(item);
            }
        });
        return resultArr;
    };
    return getItems(id).flat(99);
};
exports.getTableItemsWithID = getTableItemsWithID;
