"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableData = void 0;
const fs_1 = __importDefault(require("fs"));
const navigateFolder_1 = require("./navigateFolder");
const getTableData = (path) => {
    const folderNames = fs_1.default.readdirSync(path);
    return (0, navigateFolder_1.navigateFolder)(path)
        .flat(99)
        .map(tableRoute => fs_1.default.readFileSync(tableRoute, { encoding: "utf-8" }))
        .map((tableDataRow, index) => {
        var _a, _b, _c;
        // get id table spawn
        const idTableSpawn = Number((_a = tableDataRow.match(/(?<!GU)ID [0-9]+/g)) === null || _a === void 0 ? void 0 : _a[0].slice(3));
        // get id children table spawn
        const idChildrenTableSpawn = (tableDataRow.match(/(?<!GU)ID [0-9]+/g) || []).splice(1)
            .map(idChild => idChild.slice(3));
        // get weight children table spawn
        const weightChildrenTableSpawn = (_b = tableDataRow.match(/Weight [0-9]+/g)) === null || _b === void 0 ? void 0 : _b.map(typeChild => Number(typeChild.slice(7)));
        // get type children table spawn
        const typeChildrenTableSpawn = (_c = tableDataRow.match(/_Spawn|_Asset/g)) === null || _c === void 0 ? void 0 : _c.map(typeChild => typeChild.slice(1));
        // get folder name
        const folderNameTableSpawn = folderNames[index];
        // get children data
        const childrenTableSpawn = idChildrenTableSpawn.map((idChildren, index) => {
            return {
                id: Number(idChildren),
                type: typeChildrenTableSpawn === null || typeChildrenTableSpawn === void 0 ? void 0 : typeChildrenTableSpawn[index],
                weight: weightChildrenTableSpawn === null || weightChildrenTableSpawn === void 0 ? void 0 : weightChildrenTableSpawn[index]
            };
        });
        return {
            id: idTableSpawn,
            children: childrenTableSpawn,
            name: folderNameTableSpawn
        };
    });
};
exports.getTableData = getTableData;
