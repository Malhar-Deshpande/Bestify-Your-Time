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
exports.favouriteHelper = void 0;
const fovouriteModel_1 = require("../models/fovouriteModel");
const quizModel_1 = require("../models/quizModel");
class favouriteHelper {
    //Inserting user fav quiz to database
    AddTOFav(fav) {
        return __awaiter(this, void 0, void 0, function* () {
            const newfav = yield fovouriteModel_1.Favourite.create(fav);
            return newfav;
        });
    }
    //displaying all data to user
    getAllFav(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newarray = [];
            const allfav = yield fovouriteModel_1.Favourite.findAll({
                where: { user_id: id },
                include: [quizModel_1.Quiz]
            });
            for (let i = 0; i < allfav.length; i++) {
                newarray.push({
                    quiz_name: allfav[i].Quiz.quiz_name,
                    quiz_time: allfav[i].Quiz.quiz_time,
                });
            }
            return newarray;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletefav = yield fovouriteModel_1.Favourite.destroy({
                where: {
                    fav_id: id
                }
            });
            return deletefav;
        });
    }
}
exports.favouriteHelper = favouriteHelper;
