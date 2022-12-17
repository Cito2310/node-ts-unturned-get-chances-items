"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceData = void 0;
const replaceData = (itemsData, tablesData) => (tablesData.map((tableData => {
    const children = tableData.children.map(child => {
        if (child.type === "Spawn") {
            let childTable = Object.assign({}, (tablesData.find(item => child.id === item.id)));
            // @ts-ignore
            childTable === null || childTable === void 0 ? void 0 : childTable.weight = child.weight;
            // @ts-ignore
            return childTable;
        }
        else {
            let childItem = Object.assign({}, (itemsData.find(item => child.id === item.id)));
            // @ts-ignore
            childItem === null || childItem === void 0 ? void 0 : childItem.weight = child === null || child === void 0 ? void 0 : child.weight;
            return childItem;
        }
    });
    // @ts-ignore
    tableData.children = children;
    return tableData;
})));
exports.replaceData = replaceData;
