import { Request, Response, Application, Router, NextFunction, application } from 'express'
import { categoryHelper } from '../helper/categoryHelper'
import App from '../app';
import { Category } from '../models/categoryModel';
import { category } from '../type/category'

export class categoryRouter {

  public router: Router;
  public CategoryHelper: categoryHelper

  constructor() {
    this.router = Router();
    this.CategoryHelper = new categoryHelper();
    this.routes
  }

  createCategory: any = async (request: Request,
    response: Response,
    next: NextFunction) => {
    const myCategory: category = request.body
    console.log(myCategory)
    try {
      const newData = await this.CategoryHelper.createCategory(myCategory)
      return response.status(200).send(newData)

    } catch (error) {
      return response.status(400).send(error)

    }
  }


  getAllCategory: any = async (request: Request,
    response: Response,
    next: NextFunction) => {
    try {
      const findAllCategory = await this.CategoryHelper.getCategory()
      return response.status(200).json(findAllCategory)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  routes(app: Application) {

    app.route("/category").post(this.createCategory)
    app.route("/category").get(this.getAllCategory)

  }


}




