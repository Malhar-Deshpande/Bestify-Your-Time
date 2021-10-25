import { Request, Response, Application, Router, NextFunction } from 'express'
import { ResultHelper } from '../helper/resultHelper'
import App from '../app';
import { result } from '../type/result';
import { responseHelper } from '../helper/responseHelper';

export class resultRouter {
    public router: Router
    public resultHelper: ResultHelper
    public responseHelper: responseHelper
    public date = new Date().toJSON().slice(0, 10);

    constructor() {
        this.router = Router()
        this.resultHelper = new ResultHelper()
        this.responseHelper = new responseHelper()

    }

    SaveResult: any = async (request: Request,
        response: Response,
        next: NextFunction) => {

        const newResult: any = {
            obtained_marks: request.body.obtained_marks,
            total_marks: request.body.total_marks,
            user_id: request.body.user_id,
            quiz_id: request.body.quiz_id,
        }
        try {
            const result = await this.resultHelper.SaveResult(newResult)
            this.responseHelper.delete(result.user_id, result.quiz_id)
            return response.status(200).json(result)
        } catch (error) {
            return response.status(400).json(error)
        }

    }

    ShowResult: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        const id = request.params.id
        try {
            const result = await this.resultHelper.Showresult(id)
            return response.status(200).json(result)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    ShowAllResult: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        try {
            const allresults = await this.resultHelper.FindAllResult(this.date)
            return response.status(200).json(allresults)
        } catch (error) {
            console.log(error);
            return response.status(400).json(error)

        }
    }


    routes(app: Application) {
        app.route("/result").post(this.SaveResult)
        app.route("/result/:id").get(this.ShowResult)
        app.route("/allresult").get(this.ShowAllResult)

    }
}