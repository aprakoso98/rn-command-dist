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
// import { program } from 'commander'
var cleanProject_1 = require("../src/cleanProject");
var connectDevice_1 = require("../src/connectDevice");
var envManager_1 = require("../src/envManager");
var gradleUpdate_1 = require("../src/gradleUpdate");
var incrementVersion_1 = require("../src/incrementVersion");
var installApp_1 = require("../src/installApp");
var moveApp_1 = require("../src/moveApp");
var buildRun_1 = require("../src/buildRun");
var init_1 = require("../src/init");
var emulator_1 = require("../src/emulator");
var switchGit_1 = require("../src/switchGit");
var adbExplorer_1 = require("../src/adbExplorer");
var _a = __read(process.argv), _command = _a[2], params = _a.slice(3);
var command = _command;
var defaultCommandLog = "No command '".concat(command !== null && command !== void 0 ? command : '', "' found\n\nAvailable commands: \n\n- init: generate env folder structure\n- emu: run avd with select option\n- git-switch: switch git user with select option\n- clean\n\t--platform, -p\t\t: ios | android\n- connect\n\t--target, -t\t\t: i.e. wlan0\n- env\n- move\n\t--filename, -f\t\t: i.e. new-app.apk\n- install\n\tnot maintained\n- gradle-update\n\t--type, -t\t\t: dev | prod\n- increment-version\n\t--type, -t\t\t: dev | prod\n\t--platform, -p\t\t: ios | android\n\t[configkey]\t: x | + | 0-9\n\t\te.g. VERSION_NAME: x.x.+");
exports.theParams = params.reduce(function (ret, data) {
    var _a = __read(data.split('=')), key = _a[0], value = _a.slice(1);
    ret[key] = value.join('=');
    return ret;
}, {});
exports.ROOT_PATH = process.env.PWD;
exports.THE_COMMAND = 'r-native';
function thread(command) {
    return new Promise(function (resolve) {
        console.log(colorize('BgGreen'), command);
        var execCommand = (0, child_process_1.spawn)(command, [], { shell: true, stdio: 'inherit' });
        execCommand.on('error', resolve);
        execCommand.on('close', function () { return resolve(true); });
    });
}
exports.thread = thread;
function execCommand() {
    return new Promise(function (resolve) {
        if (command === 'clean')
            (0, cleanProject_1["default"])();
        else if (command === 'connect')
            (0, connectDevice_1["default"])();
        else if (command === 'emu')
            (0, emulator_1["default"])();
        else if (command === 'env')
            (0, envManager_1["default"])();
        else if (command === 'git-switch')
            (0, switchGit_1["default"])();
        else if (command === 'move')
            (0, moveApp_1["default"])();
        else if (command === 'install')
            (0, installApp_1["default"])();
        else if (command === 'gradle-update')
            (0, gradleUpdate_1["default"])();
        else if (command === 'increment-version')
            (0, incrementVersion_1["default"])();
        else if (command === 'build')
            (0, buildRun_1["default"])(true);
        else if (command === 'run')
            (0, buildRun_1["default"])();
        else if (command === 'init')
            (0, init_1["default"])();
        else if (command === 'explore')
            (0, adbExplorer_1["default"])();
        else
            resolve(defaultCommandLog);
    });
}
execCommand().then(function (response) {
    if (typeof response === 'string') {
        console.error(response);
    }
});
// program
// 	.command('clean')
// 	.action(cleanProject)
// 	.description('List all the TODO tasks')
// program
// 	.command('connect')
// 	.action(connectDevice)
// 	.description('List all the TODO tasks')
// program
// 	.command('emu')
// 	.action(runEmulator)
// 	.description('List all the TODO tasks')
// program
// 	.command('env')
// 	.action(envManager)
// 	.description('List all the TODO tasks')
// program
// 	.command('git-switch')
// 	.action(switchGit)
// 	.description('List all the TODO tasks')
// program
// 	.command('move')
// 	.action(moveApp)
// 	.description('List all the TODO tasks')
// program
// 	.command('install')
// 	.action(installApp)
// 	.description('List all the TODO tasks')
// program
// 	.command('gradle-update')
// 	.action(gradleUpdate)
// 	.description('List all the TODO tasks')
// program
// 	.command('increment-version')
// 	.action(incrementVersion)
// 	.description('List all the TODO tasks')
// program
// 	.command('build')
// 	.action(() => buildRun(true))
// 	.description('List all the TODO tasks')
// program
// 	.command('run')
// 	.action(buildRun)
// 	.description('List all the TODO tasks')
// program
// 	.command('init')
// 	.action(init)
// 	.description('List all the TODO tasks')
// program.parse()
