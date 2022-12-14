"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getNameFolder = (routePath) => {
    let files = [];
    const folderRoute = fs_1.default.readdirSync(routePath).map(route => path_1.default.join(routePath, route));
    folderRoute.forEach(route => {
        if (/\.[a-z]+$/.test(route)) {
            files.push(route);
        }
        else {
            files.push((0, exports.getNameFolder)(route));
        }
    });
    return files.flat(99).map((route) => {
        console.log(route);
    });
};
exports.getNameFolder = getNameFolder;
