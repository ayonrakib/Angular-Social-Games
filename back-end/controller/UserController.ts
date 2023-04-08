const UserModel = require("../models/User");
const userSequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";
const crypto = require("crypto-js");
import faker from 'faker';

class UserController{
    constructor(){

    }

    async getUsers():Promise<any>{
        const users = await UserModel.findAll();
        return users;
    }

    async getUser(attribute: number | string):Promise<ApiError | typeof UserModel>{
        console.log("parameter: ",attribute)
        if(Number.isInteger(attribute)){
            const user = await UserModel.findAll({
                where: {
                    id: attribute
                }
            });
            console.log("user found with id: ",user[0].dataValues);
            const response = new Response(user[0].dataValues, null);
            return response;
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
                const response = new Response(user[0].dataValues, null);
                return response;
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

    async updatePassword(email:string, password:string):Promise<Response>{
        console.log("came in update password with email: ",email);
        try {
            const user = await UserModel.findOne({ where: { email : email } });
            console.log("user with email in update password: ",user);
            user.password = this.hashPassword(password, faker.random.alphaNumeric(10));
            await user.save();
            return new Response(true, null);
        } catch (error) {
            console.error(error);
            const errorUpdatingPassword = new ApiError(200, "Failed to updated password!");
            return new Response(null, errorUpdatingPassword);
        }
    }

    hashPassword(password:string, salt:string):string{
        return crypto.AES.encrypt(password,salt).toString();
    }
}

export default new UserController();