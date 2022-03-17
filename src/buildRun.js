"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRunCommand = void 0;
const commander_1 = require("commander");
const methods_1 = require("../methods");
async function buildRun(args, options) {
    const { buildType, clean, platform, type: releaseType, additional } = options;
    const isBuild = args === 'build';
    const command = additional.replace(/^"|"$/g, '');
    if (platform === 'android') {
        await (0, methods_1.thread)(`${methods_1.THE_COMMAND} gradle-update -p ${platform} -t ${releaseType}`);
    }
    async function runApp() {
        if (platform === 'android') {
            if (clean)
                await (0, methods_1.thread)(`${methods_1.THE_COMMAND} clean`);
            await (0, methods_1.thread)(`npx react-native run-android ${command}`);
        }
    }
    async function buildApp() {
        if (platform === 'android') {
            if (clean)
                await (0, methods_1.thread)(`${methods_1.THE_COMMAND} clean`);
            if (buildType === 'assemble')
                await (0, methods_1.thread)(`cd android; ./gradlew assembleRelease`);
            else if (buildType === 'bundle')
                await (0, methods_1.thread)(`cd android; ./gradlew bundleRelease`);
        }
    }
    if (isBuild)
        buildApp();
    else
        runApp();
}
const buildRunCommand = () => commander_1.program
    .command('run')
    .alias('r')
    .description('Helper command to run or build react-native project')
    .action(buildRun)
    .addArgument(new commander_1.Argument('[string]', 'Build the project').choices(['build']))
    .addOption(new commander_1.Option('-c, --clean', 'Clean the project before execute run or build').default(false))
    .addOption(new commander_1.Option('-a, --additional <string>', 'Additional script on react-native command').default(''))
    .addOption(methods_1.platformTarget)
    .addOption(methods_1.releaseType)
    .addOption(methods_1.androidBuildTypeOption);
exports.buildRunCommand = buildRunCommand;
