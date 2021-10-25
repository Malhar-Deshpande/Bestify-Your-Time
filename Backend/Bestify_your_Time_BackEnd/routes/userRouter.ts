import { Request, Response, Application, Router, NextFunction } from 'express'
import { users } from '../type/user';
import * as crypto from 'crypto-js'
import jwt from 'jsonwebtoken'
import { configSecret } from '../jwtConfigSecret';
import { getUserId } from '../middleware/jwtMiddleware'
import { UserHelper } from '../helper/userHelper';

export class UserRouter {

    public router: Router;
    public UserHelper: UserHelper

    constructor() {
        this.router = Router();
        this.UserHelper = new UserHelper()
        this.routes
    }
    CreateUser: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        const users: users = request.body
        try {
            const newuser = await this.UserHelper.createUsers({
                name: users['name'],
                username: users['username'],
                email: users['email'],
                password: JSON.stringify(crypto.SHA256(`${users.password}`)),
            })
            return response.status(200).json({
                user_id: newuser['user_id'],
                name: newuser['name'],
                username: newuser['username'],
                role: newuser['role'],
            })
        } catch (ex) {
            console.log(ex)
            return response.status(400).json(ex)
        }
    }



    Login: any = async (request: Request, response: Response, next: NextFunction) => {
        const loginUser: users = request.body

        try {
            const newuser = await this.UserHelper.Login(loginUser)
            const token = jwt.sign({ user_id: newuser['user_id'] }, configSecret.secret)
            return response.status(200).json({
                userId: newuser['user_id'],
                name: newuser['name'],
                username: newuser['username'],
                token: token,
                role: newuser['role'],
            })
        } catch (Ex) {
            response.status(400).json(Ex)
        }

    }
    UserProfile: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        const encryptedId: any = request.body.user_id
        try {
            const profile = await this.UserHelper.userProfile(encryptedId)
            if (profile != null) {
                response.status(200).json({
                    name: profile['name'],
                    username: profile['username'],
                    email: profile['email'],
                })
            } else {
                return response.status(400).json({ status: 'error', message: "user does not found" })
            }
        } catch (Ex) {
            console.log(Ex)
            return response.status(400).json(Ex)
        }
    }


    routes(app: Application) {
        app.route("/signup").post(this.CreateUser)
        app.route("/login").post(this.Login)
        app.route("/profile").get(this.UserProfile)

    }

}

