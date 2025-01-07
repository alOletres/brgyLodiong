"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hashPassword = (password) => {
    const saltRounds = (0, bcrypt_1.genSaltSync)(parseInt(process.env.SALTROUND));
    if (!saltRounds)
        return undefined;
    return (0, bcrypt_1.hashSync)(password, saltRounds);
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=bcypt.js.map