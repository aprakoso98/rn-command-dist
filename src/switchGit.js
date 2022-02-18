"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchGitCommand = void 0;
const inquirer = __importStar(require("inquirer"));
const commander_1 = require("commander");
const methods_1 = require("../methods");
const USERS = {
    aprakoso98: {
        username: 'aprakoso98',
        email: 'adhyt.scott@gmail.com'
    },
    'bambang.ap': {
        username: 'bambang.ap',
        email: 'bambang.ap@flash-coffee.com'
    }
};
async function switchGit({ username, email }) {
    let user = {};
    if (username || email) {
        if (email)
            user.email = email;
        if (username)
            user.username = username;
    }
    else {
        const listUsers = Object.keys(USERS);
        const { selectedUser } = await inquirer.prompt([{
                type: "list",
                name: "selectedUser",
                message: "Select user you want to replace",
                choices: listUsers
            }]);
        user = USERS[selectedUser];
    }
    const { email: mail, username: name } = user;
    (0, methods_1.thread)(`git config --global user.name "${name}"; git config --global user.email "${mail}"; git config --list`);
}
const switchGitCommand = () => commander_1.program
    .command('git-switch')
    .description('Switch git user and email')
    .action(switchGit)
    .addOption(new commander_1.Option('-u, --username <username>', 'username')
    .argParser(username => {
    if (username.length > 2)
        return username;
    throw new commander_1.InvalidArgumentError('Please input valid username');
}))
    .addOption(new commander_1.Option('-e, --email <email>', 'email')
    .argParser(email => {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        return email;
    throw new commander_1.InvalidArgumentError('Not an valid email');
}));
exports.switchGitCommand = switchGitCommand;
