"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUservalidation = void 0;
const express_validator_1 = require("express-validator");
function createUservalidation(data) {
    return [
        express_validator_1.check("email").not().isEmpty().withMessage("invalid email "),
        express_validator_1.check("password").not().isEmpty().withMessage("invalid password")
    ];
}
exports.createUservalidation = createUservalidation;
