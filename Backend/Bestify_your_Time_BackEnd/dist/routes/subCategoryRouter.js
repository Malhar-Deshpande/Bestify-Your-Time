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
exports.subCategoryRouter = void 0;
const express_1 = require("express");
const subCategoryHelper_1 = require("../helper/subCategoryHelper");
class subCategoryRouter {
    constructor() {
        this.createSubCategory = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const mySubCategory = request.body;
            try {
                const newData = yield this.subCategoryHelper.createSubCategory(mySubCategory);
                return response.status(200).send(newData);
            }
            catch (error) {
                return response.status(400).send(error);
            }
        });
        this.getCategoryById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const findAllCategory = yield this.subCategoryHelper.getSubCategory(id);
                return response.status(200).json(findAllCategory);
            }
            catch (error) {
                return response.status(400).send(error);
            }
        });
        this.getAllSuBCategory = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allsubcategory = yield this.subCategoryHelper.getAllSubCategory();
                return response.status(200).json(allsubcategory);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.router = express_1.Router();
        this.subCategoryHelper = new subCategoryHelper_1.subCategoryHelper();
        this.routes;
    }
    routes(app) {
        app.route("/subcategory").post(this.createSubCategory);
        app.route("/subcategory/:id").get(this.getCategoryById);
        app.route("/allsubcategory").get(this.getAllSuBCategory);
    }
}
exports.subCategoryRouter = subCategoryRouter;
