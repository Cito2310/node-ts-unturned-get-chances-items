"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsWithID = void 0;
const getItemsWithID = (id, dataTable, parentWeight = 100) => {
    const itemsArray = dataTable.find(item => item.id == id);
    let resultArr = [];
    const sumWeight = itemsArray.children.reduce((valueOld, current) => valueOld + current.weight, 0);
    itemsArray.children.forEach((item) => {
        const weightPercentaje = ((item.weight * 100 / sumWeight) / 100 * parentWeight / 100) * 100;
        if (item.children) {
            resultArr.push((0, exports.getItemsWithID)(item.id, dataTable, weightPercentaje));
        }
        if (item.folder) {
            item.chances = weightPercentaje;
            resultArr.push(item);
        }
    });
    return resultArr;
};
exports.getItemsWithID = getItemsWithID;
