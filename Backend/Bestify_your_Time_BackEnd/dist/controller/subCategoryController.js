"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryController = void 0;
const subCategoryModel_1 = require("../models/subCategoryModel");
class subCategoryController {
    create(request, response) {
        const subCategory = request.body;
        console.log(subCategory);
        subCategoryModel_1.SubCategory.create(subCategory).then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
    Get(request, response) {
        subCategoryModel_1.SubCategory.findAll({
            where: {
                cat_id: request.params.id
            }
        }).then((data) => response.status(200).json(data))
            .catch((error) => response.status(500).json(error));
    }
}
exports.subCategoryController = subCategoryController;
