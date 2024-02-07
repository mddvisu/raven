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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFilesOfExtension = exports.GetExtension = exports.ReadFilesToString = exports.GetItemsInDirectory = exports.GetContentsOfDirectoryByExtension = exports.SelectJavaProjectDirectory = void 0;
var lib_1 = require("@neutralinojs/lib");
/**
 * Opens dialog for the user to select a directory for a java project, and then reads in the contents
 * of each java file within
 *
 * TODO: Search through sub-directories for java files as well. As of now this will only catch java files
 * directy within the directory
 */
function SelectJavaProjectDirectory() {
    return __awaiter(this, void 0, void 0, function () {
        var projectDir, projectCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib_1.os.showFolderDialog('Open a project Directory', {})];
                case 1:
                    projectDir = _a.sent();
                    return [4 /*yield*/, GetContentsOfDirectoryByExtension(projectDir, "java")];
                case 2:
                    projectCode = _a.sent();
                    console.log(projectCode);
                    return [2 /*return*/];
            }
        });
    });
}
exports.SelectJavaProjectDirectory = SelectJavaProjectDirectory;
/**
 * Returns the contents of all files within a directory that have the specified extension as a string
 *
 * @param {string} dir - The directory to look through
 * @param {string} extension - The extension to look for
 *
 * @returns {Promise<string>} - A string of the contents of each file concatenated together
 */
function GetContentsOfDirectoryByExtension(dir, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var items, javaFiles, fileStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, GetItemsInDirectory(dir)];
                case 1:
                    items = _a.sent();
                    javaFiles = GetFilesOfExtension(items[0], extension);
                    return [4 /*yield*/, ReadFilesToString(javaFiles)];
                case 2:
                    fileStr = _a.sent();
                    return [2 /*return*/, fileStr];
            }
        });
    });
}
exports.GetContentsOfDirectoryByExtension = GetContentsOfDirectoryByExtension;
/**
 * Returns a 2 element array. The first element is an array of paths (as strings) to each file in a directory,
 * and the second is an array of paths (also as strings) to each sub-directory in the directory
 *
 * @param {string} dir - The directory to look through
 *
 * @returns {Promise<string[][]>} - 2 element array, with the first element being an array of file paths and
 * the second being an array of directory paths
 */
function GetItemsInDirectory(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var readDir, fileArr, dirArr, _i, readDir_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib_1.filesystem.readDirectory(dir)];
                case 1:
                    readDir = _a.sent();
                    fileArr = [];
                    dirArr = [];
                    for (_i = 0, readDir_1 = readDir; _i < readDir_1.length; _i++) {
                        item = readDir_1[_i];
                        if (item.type === "FILE") {
                            fileArr.push(dir + "/" + item.entry);
                        }
                        else if (item.type === "Directory") {
                            dirArr.push(dir + "/" + item.entry);
                        }
                    }
                    return [2 /*return*/, [fileArr, dirArr]];
            }
        });
    });
}
exports.GetItemsInDirectory = GetItemsInDirectory;
/**
 * Takes in a list of strings of file paths and returns the contents of all files as a string
 *
 * @param {string[]} files - An array of the file paths
 *
 * @returns {Promise<string>} - The content of the file as a string
 */
function ReadFilesToString(files) {
    return __awaiter(this, void 0, void 0, function () {
        var fileStr, _i, files_1, file, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileStr = "";
                    _i = 0, files_1 = files;
                    _b.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 4];
                    file = files_1[_i];
                    _a = fileStr;
                    return [4 /*yield*/, lib_1.filesystem.readFile(file)];
                case 2:
                    fileStr = _a + ((_b.sent()) + "\n");
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, fileStr];
            }
        });
    });
}
exports.ReadFilesToString = ReadFilesToString;
/**
 * Takes in a file name as a string and returns its extension
 *
 * @param {string} filename - The file name or path including the extension
 * @returns {string | undefined} - The extension (without the .) if the filename had one, undefined if not
 */
function GetExtension(filename) {
    return filename.split('.').pop();
}
exports.GetExtension = GetExtension;
/**
 * Takes in a list of strings of file paths. Returns an array of only the strings with the extension specified
 * in the second parameter
 *
 * @param {string[]} filename - The file paths to look through
 * @param {string} extension - The extension to look for
 *
 * @returns {string[]} - An array of file paths containing the specified extension
 */
function GetFilesOfExtension(files, extension) {
    var retFiles = [];
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        var fileExtension = GetExtension(file);
        if (fileExtension === extension) {
            retFiles.push(file);
        }
    }
    return retFiles;
}
exports.GetFilesOfExtension = GetFilesOfExtension;
