import { User } from '../models/usersModel'
import * as crypto from 'crypto-js'

export class UserHelper {
    //Inserting user data into databasee
    async createUsers(users: any) {
        const user: any = await User.create(users)
        return user;
    }

    //login using users credentials
    async Login(users: any) {
        const user: any = await User.findOne({
            where: {
                email: users.email,
                password: JSON.stringify(crypto.SHA256(`${users.password}`))
            }
        })
        return user;
    }


    async userProfile(id: any) {
        const profile = await User.findByPk(id)
        return profile
    }
}









