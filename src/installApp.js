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
exports.installAppCommand = void 0;
const inquirer = __importStar(require("inquirer"));
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const methods_1 = require("../methods");
const outputFolder = "outputs";
async function installApp() {
    const deviceLists = (0, child_process_1.execSync)('adb devices').toString().split('\n')
        .reduce((ret, list) => {
        const index = list.indexOf('\t');
        if (index > 0)
            ret.push(list.slice(0, index));
        return ret;
    }, []);
    const fileLists = (0, child_process_1.execSync)(`ls ${outputFolder}`).toString();
    const { selectedDevice } = await inquirer.prompt([{
            type: "list",
            name: "selectedDevice",
            message: "Select device you want to set as target install",
            choices: deviceLists
        }]);
    const choices = fileLists.split('\n').filter(l => l !== '');
    const { selectedApk } = await inquirer.prompt([{
            type: "list",
            name: "selectedApk",
            message: "Select apk you want to install",
            choices
        }]);
    (0, methods_1.thread)(`adb -s ${selectedDevice} install "${methods_1.ROOT_PATH}/${outputFolder}/${selectedApk}"`);
}
const installAppCommand = () => commander_1.program
    .command('install')
    .description('Install apk file from list in /outputs folder')
    .action(installApp);
exports.installAppCommand = installAppCommand;
