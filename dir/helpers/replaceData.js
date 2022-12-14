"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceData = void 0;
const replaceData = (itemsData, tablesData) => {
    return tablesData.map(tableData => {
        const children = tableData.children.map(child => {
            if (child.type === "Spawn") {
                let childTable = tablesData.find(table => child.id === table.id && child.type === "Spawn");
                childTable.weight = child.weight;
                childTable.type = child.type;
                return childTable;
            }
            else {
                let childItem = itemsData.find(table => child.id === table.id && child.type === "Asset");
                // @ts-ignore
                childItem === null || childItem === void 0 ? void 0 : childItem.weight = child === null || child === void 0 ? void 0 : child.weight;
                return childItem;
            }
        });
        // @ts-ignore
        tableData.children = children;
        return tableData;
    });
};
exports.replaceData = replaceData;
