#!/usr/bin/env node
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.thread = exports.THE_COMMAND = exports.ROOT_PATH = exports.theParams = void 0;
require("./global");
var child_process_1 = require("child_process");
var commander_1 = require("commander");
var connectDevice_1 = require("../src/connectDevice");
var incrementVersion_1 = require("../src/incrementVersion");
var emulator_1 = require("../src/emulator");
var switchGit_1 = require("../src/switchGit");
var init_1 = require("../src/init");
var cleanProject_1 = require("../src/cleanProject");
var buildRun_1 = require("../src/buildRun");
var gradleUpdate_1 = require("../src/gradleUpdate");
var envManager_1 = require("../src/envManager");
var installApp_1 = require("../src/installApp");
var moveApp_1 = require("../src/moveApp");
var _a = __read(process.argv), command = _a[2], params = _a.slice(3);
exports.theParams = params.reduce(function (ret, data) {
    var _a = __read(data.split('=')), key = _a[0], value = _a.slice(1);
    ret[key] = value.join('=');
    return ret;
}, {});
exports.ROOT_PATH = process.env.PWD;
exports.THE_COMMAND = 'helper';
function thread(command) {
    return new Promise(function (resolve) {
        console.log(colorize('BgGreen'), command);
        var execCommand = (0, child_process_1.spawn)(command, [], { shell: true, stdio: 'inherit' });
        execCommand.on('error', resolve);
        execCommand.on('close', function () { return resolve(true); });
    });
}
exports.thread = thread;
(0, init_1.initCommand)();
(0, cleanProject_1.cleanProjectCommand)();
(0, emulator_1.runEmulatorCommand)();
(0, switchGit_1.switchGitCommand)();
(0, buildRun_1.buildRunCommand)();
(0, gradleUpdate_1.gradleUpdateCommand)();
(0, connectDevice_1.connectDeviceCommand)();
(0, envManager_1.envManagerCommand)();
(0, incrementVersion_1.incrementVersionCommand)();
(0, installApp_1.installAppCommand)();
(0, moveApp_1.moveAppCommand)();
commander_1.program.parse();
