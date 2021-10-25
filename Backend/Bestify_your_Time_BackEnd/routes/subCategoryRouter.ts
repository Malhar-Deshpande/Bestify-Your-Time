import { Request, Response, Application, NextFunction, response, Router } from 'express'
import { subCategoryHelper } from '../helper/subCategoryHelper'
import App from '../app';
import { subCategory } from '../type/subCategory';
import { SubCategory } from '../models/subCategoryModel';


export class subCategoryRouter {

  public router: Router;
  public subCategoryHelper: subCategoryHelper
  constructor() {
    this.router = Router();
    this.subCategoryHelper = new subCategoryHelper()
    this.routes
  }

  createSubCategory: any = async (request: Request,
    response: Response,
    next: NextFunction) => {
    const mySubCategory: subCategory = request.body
    try {
      const newData = await this.subCategoryHelper.createSubCategory(mySubCategory)
      return response.status(200).send(newData)

    } catch (error) {
      return response.status(400).send(error)

    }
  }

  getCategoryById: any = async (request: Request,
    response: Response,
    next: NextFunction) => {
    const id = request.params.id
    try {
      const findAllCategory = await this.subCategoryHelper.getSubCategory(id)
      return response.status(200).json(findAllCategory)
    } catch (error) {
      return response.status(400).send(error)

    }

  }


  getAllSuBCategory: any = async (request: Request,
    response: Response,
    next: NextFunction) => {
    try {
      const allsubcategory = await this.subCategoryHelper.getAllSubCategory()
      return response.status(200).json(allsubcategory)
    } catch (error) {
      return response.status(400).json(error)

    }
  }

  routes(app: Application) {

    app.route("/subcategory").post(this.createSubCategory)
    app.route("/subcategory/:id").get(this.getCategoryById)
    app.route("/allsubcategory").get(this.getAllSuBCategory)

  }




}