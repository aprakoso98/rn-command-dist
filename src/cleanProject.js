"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanProjectCommand = void 0;
const commander_1 = require("commander");
const methods_1 = require("../methods");
function cleanProject({ platform }) {
    if (platform === 'ios') {
        (0, methods_1.thread)('cd ios; xcodebuild clean');
    }
    else {
        (0, methods_1.thread)('cd android; ./gradlew clean');
    }
}
const cleanProjectCommand = () => commander_1.program
    .command('clean')
    .description('Clean react-native project')
    .action(cleanProject)
    .addOption(methods_1.platformTarget);
exports.cleanProjectCommand = cleanProjectCommand;
