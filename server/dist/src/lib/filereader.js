"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImagePath = exports.readFile = void 0;
const fs = require("fs");
const path_1 = require("path");
const readFile = async (filePath) => fs.readFileSync(filePath);
exports.readFile = readFile;
const generateImagePath = (image) => {
    const imageFullPath = (0, path_1.join)(process.cwd(), 'uploads');
    const fullImagePath = image
        ? (0, path_1.join)(imageFullPath + '/' + (image === null || image === void 0 ? void 0 : image.filename))
        : undefined;
    return fullImagePath;
};
exports.generateImagePath = generateImagePath;
//# sourceMappingURL=filereader.js.map