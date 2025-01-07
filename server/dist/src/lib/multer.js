"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOption = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
var EValidFileExtension;
(function (EValidFileExtension) {
    EValidFileExtension["PNG"] = "png";
    EValidFileExtension["JPG"] = "jpg";
    EValidFileExtension["JPEG"] = "jpeg";
})(EValidFileExtension || (EValidFileExtension = {}));
var EValidMimeType;
(function (EValidMimeType) {
    EValidMimeType["IMAGE_PNG"] = "image/png";
    EValidMimeType["IMAGE_JPG"] = "image/jpg";
    EValidMimeType["IMAGE_JPEG"] = "image/jpeg";
    EValidMimeType["APPLICATION_SPREADSHEET"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    EValidMimeType["APPLICATION_VND"] = "application/vnd.ms-excel";
})(EValidMimeType || (EValidMimeType = {}));
const validFileExtension = Object.values(EValidFileExtension);
const validMimeType = Object.values(EValidMimeType);
exports.storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        const ext = (0, path_1.extname)(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = validMimeType;
    allowedMimeTypes.includes(file.mimetype)
        ? cb(null, true)
        : cb(new common_1.HttpException('File must be a png, jpg/jpeg, or excel file', common_1.HttpStatus.BAD_REQUEST), false);
};
const limits = {
    fileSize: 10000000,
};
exports.multerOption = {
    storage: exports.storage,
    limits,
    fileFilter,
};
//# sourceMappingURL=multer.js.map