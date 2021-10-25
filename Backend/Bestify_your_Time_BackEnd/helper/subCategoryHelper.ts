import { Request, response, Response } from 'express'
import { SubCategory } from '../models/subCategoryModel'
import { subCategory } from '../type/subCategory'
import app from '../app'


export class subCategoryHelper {
// //Inserting suncategory to database
    async createSubCategory(category: any) {
        const data: any = await SubCategory.create(category)
        return data;
    }

//displaying all subcategory with id
    async getSubCategory(id: any) {
        const allCategory = await SubCategory.findAll({
            where: {
                cat_id: id
            }
        })

        return allCategory;
    }

    //displaying all subcategory
    async getAllSubCategory() {
        const allsubcategory = await SubCategory.findAll()
        return allsubcategory;
    }



}
