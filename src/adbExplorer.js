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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var inquirer_1 = require("inquirer");
var child_process_1 = require("child_process");
var bin_1 = require("../bin");
function adbExplorer() {
    var _a = bin_1.theParams, _b = _a.androidRoot, androidRoot = _b === void 0 ? '/storage/emulated/0' : _b, _c = _a.root, root = _c === void 0 ? '~' : _c;
    explore(root, androidRoot);
}
function showCurrentFiles(root, androidRoot) {
    var rootFiles = (0, child_process_1.execSync)("ls ".concat(root)).toString().split('\n').filter(function (e) { return e.length > 0; });
    var androidRootFiles = (0, child_process_1.execSync)("adb shell ls ".concat(androidRoot)).toString().split('\n').filter(function (e) { return e.length > 0; });
    var file = rootFiles.length > androidRootFiles.length ? rootFiles : androidRootFiles;
    var current = [];
    for (var i = 0; i < file.length; i++) {
        if (!current[i])
            current[i] = {};
        current[i][root] = rootFiles[i];
        current[i][androidRoot] = androidRootFiles[i];
    }
    console.table(current);
    return [rootFiles, androidRootFiles];
}
function explore(root, androidRoot) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var index, _c, rootFiles, androidRootFiles, choices, selected, regex, _d, selectedIndex, folder, nextFolder;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    index = 0;
                    _c = __read(showCurrentFiles(root, androidRoot), 2), rootFiles = _c[0], androidRootFiles = _c[1];
                    choices = __spreadArray(__spreadArray(__spreadArray([new inquirer_1.Separator('Use this folder?'), '-- Yes --', new inquirer_1.Separator('--- Root files ---')], __read(rootFiles), false), [new inquirer_1.Separator('--- Android root files ---')], false), __read(androidRootFiles), false).map(function (choice) {
                        if (choice instanceof inquirer_1.Separator || choice.includes('-- Yes --'))
                            return choice;
                        index++;
                        return "".concat(index, ")\t").concat(choice);
                    });
                    return [4 /*yield*/, (0, inquirer_1.prompt)([{
                                type: "list",
                                name: "selected",
                                message: "Select folder",
                                choices: choices
                            }])];
                case 1:
                    selected = (_e.sent()).selected;
                    regex = new RegExp(/^\d+\)\t/);
                    _d = __read([(_b = (_a = selected.match(regex)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.replace(/[^\d]/g, ''), selected.replace(regex, '')], 2), selectedIndex = _d[0], folder = _d[1];
                    nextFolder = "".concat(selectedIndex > rootFiles.length ? androidRoot : root, "/").concat(folder);
                    return [2 /*return*/, { index: selectedIndex - 1, nextFolder: nextFolder, folder: folder }];
            }
        });
    });
}
exports["default"] = adbExplorer;
