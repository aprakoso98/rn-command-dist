"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformTarget = exports.androidBuildTypeOption = exports.releaseType = exports.thread = exports.THE_COMMAND = exports.ROOT_PATH = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
exports.ROOT_PATH = process.env.PWD;
exports.THE_COMMAND = 'helper';
function thread(command) {
    return new Promise(resolve => {
        console.log(colorize('BgGreen'), command);
        const execCommand = (0, child_process_1.spawn)(command, [], { shell: true, stdio: 'inherit' });
        execCommand.on('error', resolve);
        execCommand.on('close', () => resolve(true));
    });
}
exports.thread = thread;
exports.releaseType = new commander_1.Option('-t, --type <type>', 'Release type').choices(['dev', 'prod']).default('dev');
exports.androidBuildTypeOption = new commander_1.Option('-b, --build-type <build-type>', 'Android build type').choices(['assemble', 'bundle']).default('assemble');
exports.platformTarget = new commander_1.Option('-p, --platform <platform>', 'Platform target').choices(['android', 'ios']).default('android');
