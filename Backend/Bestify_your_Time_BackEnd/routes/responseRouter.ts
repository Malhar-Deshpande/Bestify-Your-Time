import { Request, Response, Application, NextFunction, Router } from "express";
import App from "../app";
import { responseHelper } from "../helper/responseHelper";
import { responseData } from "../type/response";
export class responseRouter {

  public router: Router;
  public responseHelper: responseHelper;
  constructor() {
    this.router = Router();
    this.responseHelper = new responseHelper();
    this.routes;
  }

  saveResponse: any = async (request: Request, response: Response, next: NextFunction) => {
    const newResponse: responseData[] = request.body
    console.log(newResponse);
    try {
      const newData = this.responseHelper.create(newResponse)
      return response.status(200).send(newData)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  findResponse: any = async (request: Request, response: Response, next: NextFunction) => {
    const user_id = request.body.user_id;
    const quiz_id = request.params.quiz_id;
    try {
      const newData = await this.responseHelper.find(user_id, quiz_id)
      return response.status(200).send(newData)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public routes(app: Application): void {
    app.route("/response").post(this.saveResponse);
    app.route("/response/:quiz_id/:user_id").get(this.findResponse);
  }
}
