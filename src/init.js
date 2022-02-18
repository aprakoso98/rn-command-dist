"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const fs = __importStar(require("fs"));
const commander_1 = require("commander");
const methods_1 = require("../methods");
function errHandling(err) {
    if (err?.message)
        console.log(colorize('FgRed'), err?.message);
}
async function init() {
    const data = JSON.stringify({ ios: {}, android: {} }, null, 4);
    const flag = 'wx';
    fs.mkdirSync(`${methods_1.ROOT_PATH}/envs`);
    fs.mkdirSync(`${methods_1.ROOT_PATH}/outputs`);
    fs.writeFileSync(`${methods_1.ROOT_PATH}/envs/config-dev.json`, data, { flag });
    fs.writeFileSync(`${methods_1.ROOT_PATH}/envs/config-prod.json`, data, { flag });
    fs.writeFileSync(`${methods_1.ROOT_PATH}/envs/gradle-properties.json`, `{}`, { flag });
}
const initCommand = () => commander_1.program
    .command('init')
    .description('Initialize env files')
    .action(init);
exports.initCommand = initCommand;
