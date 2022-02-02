"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var moment = require("moment");
var bin_1 = require("../bin");
var ANDROID_PATH = "android";
var outputFolder = "outputs";
function moveApp() {
    var _a;
    var projectName = require(process.env.PWD + "/package.json").name;
    var _b = bin_1.theParams, _filename = _b["--filename"], __filename = _b["-f"], _source = _b["--source"], __source = _b["-s"];
    var source = _source !== null && _source !== void 0 ? _source : __source;
    var apkPath = "./" + ANDROID_PATH + "/app/build/outputs/apk" + (source !== null && source !== void 0 ? source : '/release/app-release.apk');
    var aabPath = "./" + ANDROID_PATH + "/app/build/outputs/bundle" + (source !== null && source !== void 0 ? source : '/release/app.aab');
    var filename = projectName + "-Bundle-" + moment().format('YYYY-MM-DD-HH-mm-ss') + ".aab";
    var pathFile = apkPath;
    if ('aab' in bin_1.theParams) {
        pathFile = aabPath;
    }
    else {
        filename = (_a = _filename !== null && _filename !== void 0 ? _filename : __filename) !== null && _a !== void 0 ? _a : projectName + "-" + moment().format('YYYY-MM-DD-HH-mm-ss') + ".apk";
    }
    child_process_1.exec("cp \"" + pathFile + "\" \"./" + outputFolder + "/" + filename + "\"", function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(filename + " copied");
    });
}
exports["default"] = moveApp;
