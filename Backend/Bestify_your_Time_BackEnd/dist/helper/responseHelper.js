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
exports.responseHelper = void 0;
const responseModel_1 = require("../models/responseModel");
class responseHelper {
    //Inserting response to database
    create(newResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            this.delete(newResponse[0].user_id, newResponse[0].quiz_id);
            const data = yield responseModel_1.ResponseData.bulkCreate(newResponse);
            return data;
        });
    }
    //showing all quizzes
    find(user_id, quiz_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allResponse = yield responseModel_1.ResponseData.findAll({
                where: {
                    user_id: user_id,
                    quiz_id: quiz_id
                }
            });
            return allResponse;
        });
    }
    delete(user_id, quiz_id) {
        return __awaiter(this, void 0, void 0, function* () {
            responseModel_1.ResponseData.destroy({
                where: {
                    user_id: user_id,
                    quiz_id: quiz_id
                }
            });
        });
    }
}
exports.responseHelper = responseHelper;
