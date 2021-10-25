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
exports.resultRouter = void 0;
const express_1 = require("express");
const resultHelper_1 = require("../helper/resultHelper");
const responseHelper_1 = require("../helper/responseHelper");
class resultRouter {
    constructor() {
        this.date = new Date().toJSON().slice(0, 10);
        this.SaveResult = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const newResult = {
                obtained_marks: request.body.obtained_marks,
                total_marks: request.body.total_marks,
                user_id: request.body.user_id,
                quiz_id: request.body.quiz_id,
            };
            try {
                const result = yield this.resultHelper.SaveResult(newResult);
                this.responseHelper.delete(result.user_id, result.quiz_id);
                return response.status(200).json(result);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.ShowResult = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const result = yield this.resultHelper.Showresult(id);
                return response.status(200).json(result);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.ShowAllResult = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allresults = yield this.resultHelper.FindAllResult(this.date);
                return response.status(200).json(allresults);
            }
            catch (error) {
                console.log(error);
                return response.status(400).json(error);
            }
        });
        this.router = express_1.Router();
        this.resultHelper = new resultHelper_1.ResultHelper();
        this.responseHelper = new responseHelper_1.responseHelper();
    }
    routes(app) {
        app.route("/result").post(this.SaveResult);
        app.route("/result/:id").get(this.ShowResult);
        app.route("/allresult").get(this.ShowAllResult);
    }
}
exports.resultRouter = resultRouter;
