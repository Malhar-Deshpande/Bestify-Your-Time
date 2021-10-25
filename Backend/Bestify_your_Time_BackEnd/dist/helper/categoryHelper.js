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
exports.categoryHelper = void 0;
const categoryModel_1 = require("../models/categoryModel");
class categoryHelper {
    //Inserting Category Into Database
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield categoryModel_1.Category.create(category);
            return data;
        });
    }
    //Displaying  AllCategory in Client side
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCategory = yield categoryModel_1.Category.findAll();
            return allCategory;
        });
    }
}
exports.categoryHelper = categoryHelper;
