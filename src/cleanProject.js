"use strict";
exports.__esModule = true;
var bin_1 = require("../bin");
function cleanProject() {
    var _a = bin_1.theParams, platform = _a["--platform"], _b = _a["-p"], _platform = _b === void 0 ? 'android' : _b;
    if ((platform !== null && platform !== void 0 ? platform : _platform) === 'ios') {
        (0, bin_1.thread)('cd ios; xcodebuild clean');
    }
    else {
        (0, bin_1.thread)('cd android; ./gradlew clean');
    }
}
exports["default"] = cleanProject;
