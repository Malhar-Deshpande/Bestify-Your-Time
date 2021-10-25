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
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseRouter = void 0;
const express_1 = require("express");
const responseHelper_1 = require("../helper/responseHelper");
class responseRouter {
    constructor() {
        this.saveResponse = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const newResponse = request.body;
            console.log(newResponse);
            try {
                const newData = this.responseHelper.create(newResponse);
                return response.status(200).send(newData);
            }
            catch (error) {
                return response.status(400).send(error);
            }
        });
        this.findResponse = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = request.body.user_id;
            const quiz_id = request.params.quiz_id;
            try {
                const newData = yield this.responseHelper.find(user_id, quiz_id);
                return response.status(200).send(newData);
            }
            catch (error) {
                return response.status(400).send(error);
            }
        });
        this.router = express_1.Router();
        this.responseHelper = new responseHelper_1.responseHelper();
        this.routes;
    }
    routes(app) {
        app.route("/response").post(this.saveResponse);
        app.route("/response/:quiz_id/:user_id").get(this.findResponse);
    }
}
exports.responseRouter = responseRouter;
