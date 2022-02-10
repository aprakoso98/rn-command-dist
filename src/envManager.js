"use strict";
exports.__esModule = true;
var bin_1 = require("../bin");
var fs_1 = require("fs");
function envManager() {
    var _a = bin_1.theParams, _env = _a["--env"], _b = _a["-f"], __env = _b === void 0 ? "dev" : _b;
    var env = _env !== null && _env !== void 0 ? _env : __env;
    var envFile = require("./envs/".concat(env, ".json"));
    fs_1["default"].writeFileSync("src/env.json", JSON.stringify(envFile.app, undefined, 2));
}
exports["default"] = envManager;
