"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfigSecret_1 = require("../jwtConfigSecret");
function getUserId(request, response, next) {
    if (request.url == "/login" || request.url == "/signup") {
        next();
    }
    else {
        try {
            const token = request.headers["token"];
            //for postman testing use JSON.parse(token)
            //const decode: any = jwt.verify(JSON.parse(token), configSecret.secret);
            const decode = jsonwebtoken_1.default.verify(token, jwtConfigSecret_1.configSecret.secret);
            request.body.user_id = decode.user_id;
            next();
        }
        catch (ex) {
            response.status(401);
            response.send({ status: "error", error: "protcted api" });
        }
    }
}
exports.getUserId = getUserId;
