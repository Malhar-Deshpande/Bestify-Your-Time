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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const usersModel_1 = require("../models/usersModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfigSecret_1 = require("../jwtConfigSecret");
const crypto = __importStar(require("crypto-js"));
class userController {
    create(request, response) {
        const newuser = request.body;
        //const encryptedPassword  = crypto.SHA256(newuser.password)
        usersModel_1.User.create({
            user_id: newuser['user_id'],
            name: newuser['name'],
            username: newuser['username'],
            email: newuser['email'],
            password: JSON.stringify(crypto.SHA256(`${newuser.password}`)),
            role: newuser['role']
        }).then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
    profile(request, response) {
        usersModel_1.User.findByPk(request.body.user_id).
            then((data) => {
            if (data) {
                response.json({
                    name: data['name'],
                    username: data['username'],
                    email: data['email'],
                    createdAt: data['createdAt'],
                    updatedAt: data['updatedAt']
                });
            }
            else {
                response.status(404).json({ errors: ["User not found"] });
            }
        }).catch((error) => response.status(500).json(error));
    }
    login(request, response) {
        const newuser = request.body;
        usersModel_1.User.findOne({ where: {
                email: newuser.email,
                password: JSON.stringify(crypto.SHA256(`${newuser.password}`))
            }
        }).then((data) => {
            if (data) {
                const token = jsonwebtoken_1.default.sign({ user_id: data['user_id'] }, jwtConfigSecret_1.configSecret.secret);
                response.status(200).json({
                    name: data['name'],
                    username: data['username'],
                    token: token
                });
            }
            else {
                response.status(500).json({ error: ['please enter right credatial'] });
            }
        }).catch((error) => { console.log(error); response.status(500).json(error); });
    }
}
exports.userController = userController;
