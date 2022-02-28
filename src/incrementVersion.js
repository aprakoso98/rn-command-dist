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
exports.incrementVersionCommand = void 0;
const fs = __importStar(require("fs"));
const commander_1 = require("commander");
const methods_1 = require("../methods");
function incrementVersion(args, { platform, type }) {
    const releaseConfigPath = `${methods_1.ROOT_PATH}/envs/config-${type}.json`;
    const releaseConfig = require(`${releaseConfigPath}`);
    const { [platform]: platformConfig, ...otherPlatform } = releaseConfig;
    const keys = Object.keys(args);
    const newReleaseConfigPlatform = keys.reduce((ret, key) => {
        const versionFormat = args?.[key].split('.') ?? [];
        if (key in platformConfig) {
            const exValue = platformConfig[key];
            const newValue = exValue.split('.').map((ver, i) => {
                const verFormat = versionFormat[i];
                if (verFormat === '+')
                    return parseInt(ver) + 1;
                if (verFormat.match(/^[0-9]*$/))
                    return parseInt(verFormat);
                return ver;
            }).join('.'); // @ts-ignore
            ret[key] = newValue;
        }
        return ret;
    }, {});
    const newReleaseConfig = {
        ...otherPlatform,
        [platform]: { ...platformConfig, ...newReleaseConfigPlatform }
    };
    fs.writeFileSync(releaseConfigPath, JSON.stringify(newReleaseConfig, undefined, 4));
}
const incrementVersionCommand = () => commander_1.program
    .command('increment-version')
    .description(`Increment your version in env files. e.g. ${methods_1.THE_COMMAND} increment-version VERSION=2.x.+.-
2 mean in that position will replaced with 2
x mean in that position will be the same
+ mean in that position will plus 1
- mean in that position will minus 1`)
    .action(incrementVersion)
    .addOption(methods_1.releaseType)
    .addOption(methods_1.platformTarget)
    .addArgument(new commander_1.Argument('[string]', 'Additional properties').argParser(value => {
    return value.split(' ').reduce((ret, val) => {
        const [key, value] = val.split('='); // @ts-ignore
        ret[key] = value;
        return ret;
    }, {});
}));
exports.incrementVersionCommand = incrementVersionCommand;
