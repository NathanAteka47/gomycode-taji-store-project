"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pwdHasherWithSalt = pwdHasherWithSalt;
exports.pwdHasher = pwdHasher;
exports.pwdConfirm = pwdConfirm;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function pwdHasherWithSalt(pwd) {
    // Define a password to hash
    const password = pwd;
    // Generate a salt
    const saltRounds = 10;
    const hashSalt = bcryptjs_1.default.genSaltSync(saltRounds);
    // Hash the password with the salt
    // const hashedPassword = bcrypt.hashSync(password, hashSalt);
    const hashedPassword = bcryptjs_1.default.hashSync(password);
    return {
        hashedPassword,
        hashSalt,
    };
}
function pwdHasher(pwd) {
    // Generate a salt
    const saltRounds = 10;
    const hashedPassword = bcryptjs_1.default.hashSync(pwd, saltRounds);
    return hashedPassword;
}
function pwdConfirm(password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
    // Log the result to the console
}
