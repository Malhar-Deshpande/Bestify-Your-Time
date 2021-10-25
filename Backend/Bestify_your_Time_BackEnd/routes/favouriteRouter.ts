import { Request, Response, Application, Router, NextFunction } from 'express'
import App from '../app';
import { favouriteHelper } from '../helper/favouriteHelper'
import { favourite } from '../type/favourite';

export class favouriteRouter {
    public router: Router
    public favouriteHelper: favouriteHelper
    constructor() {
        this.router = Router()
        this.favouriteHelper = new favouriteHelper()
    }


    addTOFav: any = async (request: Request,
        response: Response,
        next: NextFunction) => {

        const fav: favourite = request.body

        try {
            const myfav = await this.favouriteHelper.AddTOFav(fav)
            return response.status(200).json(myfav)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    getAllFav: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        const id = request.body.user_id

        console.log(id);
        try {
            const allFav: any = await this.favouriteHelper.getAllFav(id)
            return response.status(200).json(allFav)

        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }

    }
    deleteFavById: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        const id = request.params.id
        try {
            const deletefav = await this.favouriteHelper.delete(id)
            return response.status(200).json(deletefav)
        } catch (error) {
            return response.status(400).json(error)
        }
    }


    routes(app: Application) {
        app.route("/favourite").post(this.addTOFav)
        app.route("/favourite").get(this.getAllFav)
        app.route("/delete/:id").delete(this.deleteFavById)

    }

}