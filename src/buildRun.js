"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var bin_1 = require("../bin");
function buildRun(isBuild) {
    return __awaiter(this, void 0, void 0, function () {
        function runApp() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(platform === 'android')) return [3 /*break*/, 4];
                            if (!clean) return [3 /*break*/, 2];
                            return [4 /*yield*/, bin_1.thread(bin_1.THE_COMMAND + " clean")];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, bin_1.thread("react-native run-android " + command)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        function buildApp() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(platform === 'android')) return [3 /*break*/, 6];
                            if (!clean) return [3 /*break*/, 2];
                            return [4 /*yield*/, bin_1.thread(bin_1.THE_COMMAND + " clean")];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(buildType === 'assemble')) return [3 /*break*/, 4];
                            return [4 /*yield*/, bin_1.thread("cd android; ./gradlew assembleRelease")];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            if (!(buildType === 'bundle')) return [3 /*break*/, 6];
                            return [4 /*yield*/, bin_1.thread("cd android; ./gradlew bundleRelease")];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        var _a, _type, _b, __type, _clean, _c, __clean, _platform, _d, __platform, _buildType, _e, __buildType, additionalCommand, command, buildType, platform, releaseType, clean;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = bin_1.theParams, _type = _a["--type"], _b = _a["-t"], __type = _b === void 0 ? 'dev' : _b, _clean = _a["--clean"], _c = _a["-c"], __clean = _c === void 0 ? 'false' : _c, _platform = _a["--platform"], _d = _a["-p"], __platform = _d === void 0 ? 'android' : _d, _buildType = _a["--build-type"], _e = _a["-b"], __buildType = _e === void 0 ? 'assemble' : _e, additionalCommand = __rest(_a, ['--type', '-t', '--clean', '-c', '--platform', '-p', '--build-type', '-b']);
                    command = Object.keys(additionalCommand).reduce(function (ret, key) {
                        ret.push(key, additionalCommand[key]);
                        return ret;
                    }, []).join(' ');
                    buildType = (_buildType !== null && _buildType !== void 0 ? _buildType : __buildType);
                    platform = (_platform !== null && _platform !== void 0 ? _platform : __platform);
                    releaseType = (_type !== null && _type !== void 0 ? _type : __type);
                    clean = ((_clean !== null && _clean !== void 0 ? _clean : __clean) === 'true') ? true : false;
                    if (!(platform === 'android')) return [3 /*break*/, 2];
                    return [4 /*yield*/, bin_1.thread(bin_1.THE_COMMAND + " gradle-update -p=\"" + platform + "\" -t=\"" + releaseType + "\"")];
                case 1:
                    _f.sent();
                    _f.label = 2;
                case 2:
                    if (isBuild)
                        buildApp();
                    else
                        runApp();
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = buildRun;
