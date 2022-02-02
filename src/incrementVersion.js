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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var fs = require("fs");
var bin_1 = require("../bin");
function incrementVersion() {
    var _a;
    var _b = bin_1.theParams, _type = _b["--type"], _c = _b["-t"], __type = _c === void 0 ? 'dev' : _c, _platform = _b["--platform"], _d = _b["-p"], __platform = _d === void 0 ? 'android' : _d;
    var platform = (_platform !== null && _platform !== void 0 ? _platform : __platform);
    var releaseType = _type !== null && _type !== void 0 ? _type : __type;
    var releaseConfigPath = bin_1.ROOT_PATH + "/envs/config-" + releaseType + ".json";
    var releaseConfig = require("" + releaseConfigPath);
    var _e = releaseConfig, _f = platform, platformConfig = _e[_f], otherPlatform = __rest(_e, [typeof _f === "symbol" ? _f : _f + ""]);
    var keys = Object.keys(bin_1.theParams);
    var newReleaseConfigPlatform = keys.reduce(function (ret, key) {
        var _a;
        var versionFormat = (_a = bin_1.theParams === null || bin_1.theParams === void 0 ? void 0 : bin_1.theParams[key].split('.')) !== null && _a !== void 0 ? _a : [];
        if (key in platformConfig) {
            var exValue = platformConfig[key];
            var newValue = exValue.split('.').map(function (ver, i) {
                var verFormat = versionFormat[i];
                if (verFormat === '+')
                    return parseInt(ver) + 1;
                if (verFormat.match(/^[0-9]*$/))
                    return parseInt(verFormat);
                return ver;
            }).join('.');
            ret[key] = newValue;
        }
        return ret;
    }, {});
    var newReleaseConfig = __assign(__assign({}, otherPlatform), (_a = {}, _a[platform] = __assign(__assign({}, platformConfig), newReleaseConfigPlatform), _a));
    fs.writeFileSync(releaseConfigPath, JSON.stringify(newReleaseConfig, undefined, 4));
}
exports["default"] = incrementVersion;
