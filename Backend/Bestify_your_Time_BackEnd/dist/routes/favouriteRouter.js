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
exports.favouriteRouter = void 0;
const express_1 = require("express");
const favouriteHelper_1 = require("../helper/favouriteHelper");
class favouriteRouter {
    constructor() {
        this.addTOFav = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const fav = request.body;
            try {
                const myfav = yield this.favouriteHelper.AddTOFav(fav);
                return response.status(200).json(myfav);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.getAllFav = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.body.user_id;
            console.log(id);
            try {
                const allFav = yield this.favouriteHelper.getAllFav(id);
                return response.status(200).json(allFav);
            }
            catch (error) {
                console.log(error);
                return response.status(400).json(error);
            }
        });
        this.deleteFavById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const deletefav = yield this.favouriteHelper.delete(id);
                return response.status(200).json(deletefav);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.router = express_1.Router();
        this.favouriteHelper = new favouriteHelper_1.favouriteHelper();
    }
    routes(app) {
        app.route("/favourite").post(this.addTOFav);
        app.route("/favourite").get(this.getAllFav);
        app.route("/delete/:id").delete(this.deleteFavById);
    }
}
exports.favouriteRouter = favouriteRouter;
