"use strict";
exports.__esModule = true;
var moment = require("moment");
var child_process_1 = require("child_process");
var bin_1 = require("../bin");
var ANDROID_PATH = "android";
var outputFolder = "outputs";
function moveApp() {
    var _a, _b;
    var projectName = require("".concat(process.env.PWD, "/package.json")).name;
    var _c = bin_1.theParams, _filename = _c["--filename"], __filename = _c["-f"], _source = _c["--source"], __source = _c["-s"], _additional = _c["--additional"], __additional = _c["-a"];
    var source = _source !== null && _source !== void 0 ? _source : __source;
    var additional = (_a = _additional !== null && _additional !== void 0 ? _additional : __additional) !== null && _a !== void 0 ? _a : '';
    var apkPath = "./".concat(ANDROID_PATH, "/app/build/outputs/apk").concat(source !== null && source !== void 0 ? source : '/release/app-release.apk');
    var aabPath = "./".concat(ANDROID_PATH, "/app/build/outputs/bundle").concat(source !== null && source !== void 0 ? source : '/release/app.aab');
    var filename = "".concat(projectName, "-Bundle-").concat(moment().format('YYYY-MM-DD-HH-mm-ss'), ".aab");
    var pathFile = apkPath;
    if ('aab' in bin_1.theParams) {
        pathFile = aabPath;
    }
    else {
        filename = (_b = _filename !== null && _filename !== void 0 ? _filename : __filename) !== null && _b !== void 0 ? _b : "".concat(projectName, "-").concat(moment().format('YYYY-MM-DD-HH-mm-ss'), ".apk");
    }
    filename = "".concat(additional).concat(filename);
    (0, child_process_1.exec)("cp \"".concat(pathFile, "\" \"./").concat(outputFolder, "/").concat(filename, "\""), function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("".concat(filename, " copied"));
    });
}
exports["default"] = moveApp;
