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
exports.runEmulatorCommand = void 0;
const inquirer = __importStar(require("inquirer"));
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const methods_1 = require("../methods");
async function runEmulator() {
    const listAvds = (0, child_process_1.execSync)('emulator -list-avds')
        .toString()
        .split('\n')
        .filter(avd => avd !== '');
    const selectedAvd = listAvds.length > 1
        ? (await inquirer.prompt([{
                type: "list",
                name: "selectedAvd",
                message: "Select avd you want to run",
                choices: listAvds
            }])).selectedAvd
        : listAvds[0];
    (0, methods_1.thread)(`cd $ANDROID_HOME/emulator; ./emulator @${selectedAvd}`);
}
const runEmulatorCommand = () => commander_1.program
    .command('emu')
    .description('Run emulator with selected device')
    .action(runEmulator);
exports.runEmulatorCommand = runEmulatorCommand;
