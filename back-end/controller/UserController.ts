const UserModel = require("../models/User");
const userSequelize = require("../mariadb");

class UserController{
    constructor(){

    }

    async getUsers():Promise<any>{
        const users = await UserModel.findAll();
        return users;
    }

    async createUser(firstName:string, lastName:string, email: string, password: string, salt:string, session:string):Promise<boolean>{
        console.log("came to create user!");
        try{
            const user = await UserModel.create({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                salt:salt,
                session:session
            })
            return user.isNewRecord === false ? true : false;
        }
        catch(error){
            return error.errors[0].message;
        }
    }
}

export default new UserController();