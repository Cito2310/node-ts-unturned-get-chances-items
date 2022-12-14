"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsData = void 0;
const fs_1 = __importDefault(require("fs"));
const navigateFolder_1 = require("./navigateFolder");
const getItemsData = (basepath) => {
    const folderNames = fs_1.default.readdirSync(basepath);
    return (0, navigateFolder_1.navigateFolder)(basepath)
        .flat()
        .map((itemsRoutesArray) => {
        const folderNameItem = folderNames.filter(folderName => itemsRoutesArray[0].includes(folderName));
        return [
            itemsRoutesArray.map((itemRoute) => fs_1.default.readFileSync(itemRoute, { encoding: "utf-8" })), folderNameItem
        ].flat();
    })
        .map((dataRawItem) => {
        var _a, _b, _c;
        // get rarity
        let rarityItem = dataRawItem[1].match(/Rarity [a-zA-Z]+/g);
        if (rarityItem) {
            rarityItem = rarityItem[0].slice(7);
        }
        else {
            rarityItem = "-";
        }
        // get name
        let nameItem = (_a = dataRawItem[0].slice(5).match(/[a-zA-Z" "0-9\.\/\-]+/)) === null || _a === void 0 ? void 0 : _a["0"];
        if (!nameItem) {
            nameItem = "-";
        }
        ;
        // // get id
        const idItem = Number((_b = dataRawItem[1].match(/(?<!GU)ID [0-9]+/)) === null || _b === void 0 ? void 0 : _b["0"].slice(3));
        // // get type
        let typeItem = (_c = dataRawItem[1].match(/\nType [a-zA-Z]+/)) === null || _c === void 0 ? void 0 : _c["0"].slice(6);
        if (!typeItem) {
            typeItem = "-";
        }
        // // get folder name item
        let folderNameItem = dataRawItem[2];
        return {
            name: nameItem,
            id: idItem,
            type: typeItem,
            folder: folderNameItem,
            rarity: rarityItem,
        };
    });
};
exports.getItemsData = getItemsData;
