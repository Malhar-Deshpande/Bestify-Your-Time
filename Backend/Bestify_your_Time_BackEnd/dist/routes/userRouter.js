"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const crypto = __importStar(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfigSecret_1 = require("../jwtConfigSecret");
const userHelper_1 = require("../helper/userHelper");
class UserRouter {
    constructor() {
        this.CreateUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const users = request.body;
            try {
                const newuser = yield this.UserHelper.createUsers({
                    name: users['name'],
                    username: users['username'],
                    email: users['email'],
                    password: JSON.stringify(crypto.SHA256(`${users.password}`)),
                });
                return response.status(200).json({
                    user_id: newuser['user_id'],
                    name: newuser['name'],
                    username: newuser['username'],
                    role: newuser['role'],
                });
            }
            catch (ex) {
                console.log(ex);
                return response.status(400).json(ex);
            }
        });
        this.Login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const loginUser = request.body;
            try {
                const newuser = yield this.UserHelper.Login(loginUser);
                const token = jsonwebtoken_1.default.sign({ user_id: newuser['user_id'] }, jwtConfigSecret_1.configSecret.secret);
                return response.status(200).json({
                    userId: newuser['user_id'],
                    name: newuser['name'],
                    username: newuser['username'],
                    token: token,
                    role: newuser['role'],
                });
            }
            catch (Ex) {
                response.status(400).json(Ex);
            }
        });
        this.UserProfile = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const encryptedId = request.body.user_id;
            try {
                const profile = yield this.UserHelper.userProfile(encryptedId);
                if (profile != null) {
                    response.status(200).json({
                        name: profile['name'],
                        username: profile['username'],
                        email: profile['email'],
                    });
                }
                else {
                    return response.status(400).json({ status: 'error', message: "user does not found" });
                }
            }
            catch (Ex) {
                console.log(Ex);
                return response.status(400).json(Ex);
            }
        });
        this.router = express_1.Router();
        this.UserHelper = new userHelper_1.UserHelper();
        this.routes;
    }
    routes(app) {
        app.route("/signup").post(this.CreateUser);
        app.route("/login").post(this.Login);
        app.route("/profile").get(this.UserProfile);
    }
}
exports.UserRouter = UserRouter;
