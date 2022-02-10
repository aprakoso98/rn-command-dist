"use strict";
exports.__esModule = true;
exports.cleanProjectCommand = void 0;
var commander_1 = require("commander");
var bin_1 = require("../bin");
function cleanProject(_a) {
    var platform = _a.platform;
    if (platform === 'ios') {
        (0, bin_1.thread)('cd ios; xcodebuild clean');
    }
    else {
        (0, bin_1.thread)('cd android; ./gradlew clean');
    }
}
var cleanProjectCommand = function () { return commander_1.program
    .command('clean')
    .addOption(new commander_1.Option('-p, --platform <platform>', 'Platforms')
    .choices(['android', 'ios'])["default"]('android'))
    .description('Clean project')
    .action(cleanProject); };
exports.cleanProjectCommand = cleanProjectCommand;
