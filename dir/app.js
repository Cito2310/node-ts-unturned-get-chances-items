"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getItemsData_1 = require("./helpers/getItemsData");
const getTableData_1 = require("./helpers/getTableData");
const replaceData_1 = require("./helpers/replaceData");
const getItemsWithID_1 = require("./helpers/getItemsWithID");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const pathSpawnTable = String.raw `.\Spawns`;
const pathItems = String.raw `E:\SteamLibrary\steamapps\workshop\content\304930\2683620106\Arid\Bundles\MAIN\Items`;
const itemsData = (0, getItemsData_1.getItemsData)(pathItems);
const tableData = (0, getTableData_1.getTableData)(pathSpawnTable);
const replaceItemsTable = (0, replaceData_1.replaceData)(itemsData, tableData);
const ItemsWithId = (0, getItemsWithID_1.getItemsWithID)(59007, replaceItemsTable).flat(99);
fs_1.default.writeFileSync(`./out/unturned-${(0, uuid_1.v4)()}.json`, JSON.stringify(ItemsWithId));
