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
exports.categoryRouter = void 0;
const express_1 = require("express");
const categoryHelper_1 = require("../helper/categoryHelper");
class categoryRouter {
    constructor() {
        this.createCategory = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const myCategory = request.body;
            console.log(myCategory);
            try {
                const newData = yield this.CategoryHelper.createCategory(myCategory);
                return response.status(200).send(newData);
            }
            catch (error) {
                return response.status(400).send(error);
            }
        });
        this.getAllCategory = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findAllCategory = yield this.CategoryHelper.getCategory();
                return response.status(200).json(findAllCategory);
            }
            catch (error) {
                return response.status(400).send(error);
            }
        });
        this.router = express_1.Router();
        this.CategoryHelper = new categoryHelper_1.categoryHelper();
        this.routes;
    }
    routes(app) {
        app.route("/category").post(this.createCategory);
        app.route("/category").get(this.getAllCategory);
    }
}
exports.categoryRouter = categoryRouter;
