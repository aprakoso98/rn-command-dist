"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fs = require("fs");
var bin_1 = require("../bin");
function gradleUpdate() {
    var gradleFile = bin_1.ROOT_PATH + "/android/gradle.properties";
    var configFilePath = bin_1.ROOT_PATH + "/envs/gradle-properties.json";
    var _a = bin_1.theParams, type = _a["--type"], _b = _a["-t"], _type = _b === void 0 ? 'dev' : _b, _platform = _a["--platform"], _c = _a["-p"], __platform = _c === void 0 ? 'android' : _c;
    var platform = (_platform !== null && _platform !== void 0 ? _platform : __platform);
    var releaseType = type !== null && type !== void 0 ? type : _type;
    var releaseConfigPath = bin_1.ROOT_PATH + "/envs/config-" + releaseType + ".json";
    var releaseConfigAll = require("" + releaseConfigPath);
    var _d = releaseConfigAll, _e = platform, releaseConfig = _d[_e];
    if (['dev', 'prod'].includes(releaseType)) {
        var properties = fs.readFileSync(gradleFile, { encoding: 'utf8' })
            .split(/\n/g)
            .reduce(function (ret, val) {
            var _a;
            var _b = __read((_a = val === null || val === void 0 ? void 0 : val.split('=')) !== null && _a !== void 0 ? _a : []), key = _b[0], value = _b.slice(1);
            if (key !== '')
                ret[key] = value.join('=');
            return ret;
        }, {});
        var config = require("" + configFilePath);
        var newConfig_1 = __assign(__assign(__assign(__assign({}, properties), config), releaseConfig), { CURRENT_CONFIG: releaseType });
        var parsed = Object.keys(newConfig_1)
            .map(function (key) { return key + "=" + newConfig_1[key]; })
            .join('\n');
        fs.writeFileSync(gradleFile, parsed);
        fs.writeFileSync(configFilePath, JSON.stringify(newConfig_1, undefined, 4));
    }
}
exports["default"] = gradleUpdate;
