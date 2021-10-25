import { Request, response, Response, NextFunction, request } from 'express'
import { Category } from '../models/categoryModel'
import { category } from '../type/category'
import app from '../app'
import { categoryRouter } from '../routes/categoryRouter'

export class categoryHelper {
    //Inserting Category Into Database
    async createCategory(category: any) {
        const data: any = await Category.create(category)
        return data;
    }
    //Displaying  AllCategory in Client side
    async getCategory() {
        const allCategory = await Category.findAll()
        return allCategory;
    }
}