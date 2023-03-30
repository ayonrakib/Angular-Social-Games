const UserModel = require("../models/User");
const userSequelize = require("../mariadb");
import ApiError from "../utils/exception";

class UserController{
    constructor(){

    }

    async getUsers():Promise<any>{
        const users = await UserModel.findAll();
        return users;
    }

    async getUser(attribute: number| string):Promise<ApiError | typeof UserModel>{
        console.log("parameter: ",attribute)
        if(Number.isInteger(attribute)){
            const user = await UserModel.findAll({
                where: {
                    id: attribute
                }
            });
            console.log("user found with email: ",user[0].dataValues);
            return user[0].dataValues;
        }
        else{
            const user = await UserModel.findAll({
                where: {
                    email  : attribute
                }
            });
            console.log("user with email: ",user)
            if(user.length === 0){
                const errorResponse = new ApiError(200,"user not found!");
                console.log("error response: ",errorResponse)
                return new ApiError(200,"user not found!");
            }
            else{
                return user[0].dataValues;
            }

        }
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

    async deleteUser(email:string):Promise<boolean>{
        console.log("came to delete user!");
        try{
            return true;
        }
        catch(error){
            return true;
        }
    }
}

export default new UserController();