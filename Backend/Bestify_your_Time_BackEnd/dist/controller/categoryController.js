"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const categoryModel_1 = require("../models/categoryModel");
class categoryController {
    create(request, response) {
        const category = request.body;
        console.log(category);
        categoryModel_1.Category.create(category).then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
    Get(request, response) {
        categoryModel_1.Category.findAll().then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
}
exports.categoryController = categoryController;
