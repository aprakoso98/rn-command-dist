"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootGitCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const methods_1 = require("../methods");
const root = `~`;
const rootGitFolder = `${root}/.git`;
const movedRootGitFolder = `${root}/root-git`;
const gitignore = `${root}/.gitignore`;
const movedGitignore = `${root}/root-gitignore`;
function rootGit({ rename }) {
    (0, child_process_1.exec)(`ls ${rootGitFolder}`, async (err) => {
        if (rename) {
            if (err) {
                await (0, methods_1.thread)(`mv ${movedRootGitFolder} ${rootGitFolder}; code ${root}`);
                await (0, methods_1.thread)(`mv ${movedGitignore} ${gitignore}`);
                return;
            }
            await (0, methods_1.thread)(`mv ${rootGitFolder} ${movedRootGitFolder}`);
            await (0, methods_1.thread)(`mv ${gitignore} ${movedGitignore}`);
            return;
        }
        console.log(colorize(err ? 'BgRed' : 'BgGreen'), ` ${rootGitFolder} ${err ? 'not found' : 'has found'} `);
    });
}
const rootGitCommand = () => commander_1.program
    .command('root-git')
    .alias('rg')
    .addOption(new commander_1.Option('-r, --rename', 'Enable/Disable git in root folder').default(false))
    .description('Switch root git folder')
    .action(rootGit);
exports.rootGitCommand = rootGitCommand;
