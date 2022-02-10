"use strict";
exports.__esModule = true;
exports.envManagerCommand = void 0;
var fs_1 = require("fs");
var commander_1 = require("commander");
function envManager(_a) {
    var env = _a.env;
    var envFile = require("./envs/".concat(env, ".json"));
    fs_1["default"].writeFileSync("src/env.json", JSON.stringify(envFile.app, undefined, 2));
}
var envManagerCommand = function () { return commander_1.program
    .command('env')
    .action(envManager)
    .addOption(new commander_1.Option('-e, --env <env>', 'env')["default"]('dev')); };
exports.envManagerCommand = envManagerCommand;
