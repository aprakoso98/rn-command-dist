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
exports.__esModule = true;
exports.getDeviceLists = void 0;
var child_process_1 = require("child_process");
var bin_1 = require("../bin");
function getDeviceLists() {
    return new Promise(function (resolve) {
        child_process_1.exec('adb shell ip route', function (err, stdout) {
            if (err) {
                console.error('error: No devices/emulators found');
            }
            else {
                var devices = stdout
                    .split(/\n/g)
                    .map(function (d) {
                    var key = 'ip';
                    var device = d.split(' ').reduce(function (ret, s, i) {
                        if (i % 2 === 1)
                            key = s;
                        else
                            ret[key] = s;
                        return ret;
                    }, {});
                    if (device.src)
                        return device;
                    else
                        return {};
                })
                    .filter(function (d) { return d === null || d === void 0 ? void 0 : d.src; });
                resolve(devices);
            }
        });
    });
}
exports.getDeviceLists = getDeviceLists;
function connectDevice() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _target, _b, __target, target, devices, selectedDevice;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = bin_1.theParams, _target = _a["--target"], _b = _a["-t"], __target = _b === void 0 ? 'wlan0' : _b;
                    target = _target !== null && _target !== void 0 ? _target : __target;
                    return [4 /*yield*/, getDeviceLists()];
                case 1:
                    devices = _c.sent();
                    if ((devices === null || devices === void 0 ? void 0 : devices.length) > 0) {
                        selectedDevice = devices.filter(function (a) { return (a === null || a === void 0 ? void 0 : a.dev) === target; });
                        if (selectedDevice.length > 0) {
                            child_process_1.exec("adb disconnect; adb tcpip 5555; adb connect " + selectedDevice[0].src + ":5555", function (err, msg) {
                                if (err)
                                    console.error(err);
                                else
                                    console.log(msg);
                            });
                        }
                        else
                            console.error('error: No devices/emulators found');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = connectDevice;
