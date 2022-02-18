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
exports.gradleUpdateCommand = void 0;
const fs = __importStar(require("fs"));
const commander_1 = require("commander");
const methods_1 = require("../methods");
function gradleUpdate({ platform, type: releaseType }) {
    const gradleFile = `${methods_1.ROOT_PATH}/android/gradle.properties`;
    const configFilePath = `${methods_1.ROOT_PATH}/envs/gradle-properties.json`;
    const releaseConfigPath = `${methods_1.ROOT_PATH}/envs/config-${releaseType}.json`;
    const releaseConfigAll = require(`${releaseConfigPath}`);
    const { [platform]: releaseConfig } = releaseConfigAll;
    if (['dev', 'prod'].includes(releaseType)) {
        const properties = fs.readFileSync(gradleFile, { encoding: 'utf8' })
            .split(/\n/g)
            .reduce((ret, val) => {
            const [key, ...value] = val?.split('=') ?? [];
            if (key !== '')
                ret[key] = value.join('=');
            return ret;
        }, {});
        const config = require(`${configFilePath}`);
        const newConfig = { ...properties, ...config, ...releaseConfig, CURRENT_CONFIG: releaseType };
        const parsed = Object.keys(newConfig)
            .map(key => `${key}=${newConfig[key]}`)
            .join('\n');
        fs.writeFileSync(gradleFile, parsed);
        fs.writeFileSync(configFilePath, JSON.stringify(newConfig, undefined, 4));
    }
}
const gradleUpdateCommand = () => commander_1.program
    .command('gradle-update')
    .description('Switch gradle.properties value from env value')
    .action(gradleUpdate)
    .addOption(methods_1.releaseType)
    .addOption(methods_1.platformTarget);
exports.gradleUpdateCommand = gradleUpdateCommand;
