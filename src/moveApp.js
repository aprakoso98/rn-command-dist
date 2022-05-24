"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveAppCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const ANDROID_PATH = "android";
const outputFolder = "outputs";
async function moveApp(args, options) {
    if (!fs_1.default.existsSync(outputFolder))
        fs_1.default.mkdirSync(outputFolder);
    const isAab = args === "aab";
    const { list, additional, source, filename: _filename, skipList } = options;
    const { name: projectName, } = require(`${process.env.PWD}/package.json`);
    const apkPath = `./${ANDROID_PATH}/app/build/outputs/apk${source || "/release/app-release.apk"}`;
    const aabPath = `./${ANDROID_PATH}/app/build/outputs/bundle${source || "/release/app.aab"}`;
    let filename = `${projectName}-Bundle-${(0, moment_1.default)().format("YYYY-MM-DD-HH-mm-ss")}.aab`;
    let pathFile = apkPath;
    if (isAab) {
        pathFile = aabPath;
    }
    else {
        filename =
            _filename ||
                `${projectName}-${(0, moment_1.default)().format("YYYY-MM-DD-HH-mm-ss")}.apk`;
    }
    filename = `${additional}${filename}`;
    if (!skipList) {
        const fileChoossed = await getListApk(isAab);
        if (list && fileChoossed) {
            pathFile = fileChoossed;
        }
    }
    const command = `cp "${pathFile}" "./${outputFolder}/${filename}"`;
    (0, child_process_1.exec)(command, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${filename} copied`);
    });
}
const moveAppCommand = () => commander_1.program
    .command("move")
    .alias("mv")
    .description("Move apk to /outputs folder")
    .action(moveApp)
    .addArgument(new commander_1.Argument("[string]", "Move aab file").choices(["aab"]))
    .addOption(new commander_1.Option("-l, --list", "Show list apk, and select to move").default(false))
    .addOption(new commander_1.Option("-sl, --skip-list", "Skip apk chooser").default(false))
    .addOption(new commander_1.Option("-s, --source <source>", "Source apk you want to move"))
    .addOption(new commander_1.Option("-f, --filename <filename>", "Filename of moved apk"))
    .addOption(new commander_1.Option("-a, --additional <string>", 'Additional filename will be added to first character. e.g. "-a SG-" -> "SG-{filename}"').default(""));
exports.moveAppCommand = moveAppCommand;
function getListApk(isAab) {
    return new Promise((resolve) => {
        (0, child_process_1.exec)(`find ./android -iname '*.${isAab ? "aab" : "apk"}'`, async (err, listFile) => {
            if (err)
                resolve(false);
            const choices = listFile.split("\n").filter((l) => l !== "");
            const { file } = await inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "file",
                    message: "Select file you want to move",
                    choices,
                },
            ]);
            resolve(file);
        });
    });
}
