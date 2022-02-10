"use strict";
exports.__esModule = true;
exports.moveAppCommand = void 0;
var moment = require("moment");
var child_process_1 = require("child_process");
var commander_1 = require("commander");
var ANDROID_PATH = "android";
var outputFolder = "outputs";
function moveApp(args, options) {
    var isAab = args === 'aab';
    var additional = options.additional, source = options.source, _filename = options.filename;
    var projectName = require("".concat(process.env.PWD, "/package.json")).name;
    var apkPath = "./".concat(ANDROID_PATH, "/app/build/outputs/apk").concat(source !== null && source !== void 0 ? source : '/release/app-release.apk');
    var aabPath = "./".concat(ANDROID_PATH, "/app/build/outputs/bundle").concat(source !== null && source !== void 0 ? source : '/release/app.aab');
    var filename = "".concat(projectName, "-Bundle-").concat(moment().format('YYYY-MM-DD-HH-mm-ss'), ".aab");
    var pathFile = apkPath;
    if (isAab) {
        pathFile = aabPath;
    }
    else {
        filename = _filename !== null && _filename !== void 0 ? _filename : "".concat(projectName, "-").concat(moment().format('YYYY-MM-DD-HH-mm-ss'), ".apk");
    }
    filename = "".concat(additional).concat(filename);
    var command = "cp \"".concat(pathFile, "\" \"./").concat(outputFolder, "/").concat(filename, "\"");
    (0, child_process_1.exec)(command, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("".concat(filename, " copied"));
    });
}
var moveAppCommand = function () { return commander_1.program
    .command('move')
    .action(moveApp)
    .addArgument(new commander_1.Argument('[string]').choices(['aab']))
    .addOption(new commander_1.Option('-s, --source <source>', 'Platforms'))
    .addOption(new commander_1.Option('-f, --filename <filename>', 'Platforms'))
    .addOption(new commander_1.Option('-a, --additional <string>', 'Platforms')["default"]('')); };
exports.moveAppCommand = moveAppCommand;
