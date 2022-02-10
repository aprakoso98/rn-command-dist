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
exports.incrementVersionCommand = void 0;
var commander_1 = require("commander");
var fs = require("fs");
var bin_1 = require("../bin");
function incrementVersion(args, _a) {
    var _b;
    var platform = _a.platform, type = _a.type;
    var releaseConfigPath = "".concat(bin_1.ROOT_PATH, "/envs/config-").concat(type, ".json");
    var releaseConfig = require("".concat(releaseConfigPath));
    var _c = releaseConfig, _d = platform, platformConfig = _c[_d], otherPlatform = __rest(_c, [typeof _d === "symbol" ? _d : _d + ""]);
    var keys = Object.keys(args);
    var newReleaseConfigPlatform = keys.reduce(function (ret, key) {
        var _a;
        var versionFormat = (_a = args === null || args === void 0 ? void 0 : args[key].split('.')) !== null && _a !== void 0 ? _a : [];
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
    var newReleaseConfig = __assign(__assign({}, otherPlatform), (_b = {}, _b[platform] = __assign(__assign({}, platformConfig), newReleaseConfigPlatform), _b));
    fs.writeFileSync(releaseConfigPath, JSON.stringify(newReleaseConfig, undefined, 4));
}
var incrementVersionCommand = function () { return commander_1.program
    .command('increment-version')
    .action(incrementVersion)
    .addOption(new commander_1.Option('-t, --type <type>', 'Platforms')
    .choices(['dev', 'prod'])["default"]('dev'))
    .addOption(new commander_1.Option('-p, --platform <platform>', 'Platforms')
    .choices(['android', 'ios'])["default"]('android'))
    .addArgument(new commander_1.Argument('[string]').argParser(function (value) {
    return value.split(' ').reduce(function (ret, val) {
        var _a = __read(val.split('='), 2), key = _a[0], value = _a[1];
        ret[key] = value;
        return ret;
    }, {});
})); };
exports.incrementVersionCommand = incrementVersionCommand;
