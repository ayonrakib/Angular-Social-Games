const UserModel = require("../models/User");
const userSequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import crypto from "crypto-js";
import getErrorFormat from "../utils/error";
import faker from "faker";

class UserController {
  constructor() {}

  async getUsers(): Promise<any> {
    const users = await UserModel.findAll();
    return users;
  }

  async getUser(
    attribute: number | string
  ): Promise<ApiError | typeof UserModel | Response> {
    console.log("parameter: ", attribute);
    console.log("parameter type: ", typeof attribute);
    if (Number.isInteger(attribute)) {
      const user = await UserModel.findAll({
        where: {
          id: attribute,
        },
      });
      console.log("user found with id: ", user[0].dataValues);
      const response = new Response(user[0].dataValues, null);
      return response;
    } else {
      try {
        const user = await UserModel.findOne({
          where: {
            email: attribute,
          },
        });
        console.log("user with email in get user method try block: ", user);
        if (user !== null) {
          console.log("found user!");
          const userFoundResponseresponse = new Response(true, null);
          return userFoundResponseresponse;
        } else {
          console.log("didnt find user!");
          const userNotFoundResponse = new Response(false, null);
          return userNotFoundResponse;
        }
      } catch (error) {
        const errorResponse = new ApiError(
          300,
          "Could not connect with database! Please try again!"
        );
        console.log(
          "error response in catch block of get user method: ",
          errorResponse
        );
        const errorFindingUserResponse = new Response(
          null,
          errorResponse.getResponse()
        );
        return errorFindingUserResponse;
      }
    }
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    salt: string,
    session: string
  ): Promise<Response> {
    console.log("came to create user!");
    try {
      const user = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        salt: salt,
        session: session,
      });
      if (user instanceof UserModel) {
        const userCreatedResponse = new Response(true, null);
        return userCreatedResponse;
      }

      const userFailedToCreateError = new ApiError(
        300,
        "User faild to create!"
      );
      const userFailedToCreateErrorResponse = new Response(
        null,
        userFailedToCreateError.getResponse()
      );
      return userFailedToCreateErrorResponse;
    } catch (error) {
      const userFailedToCreateError = new ApiError(
        400,
        "Couldnt connect to database! Please try again!"
      );
      const userFailedToCreateErrorResponse = new Response(
        null,
        userFailedToCreateError.getResponse()
      );
      return userFailedToCreateErrorResponse;
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    console.log("came to delete user!");
    try {
      return true;
    } catch (error) {
      return true;
    }
  }

  async updatePassword(email: string, password: string): Promise<Response> {
    console.log("came in update password with email: ", email);
    try {
      const user = await UserModel.findOne({ where: { email: email } });
      console.log("user with email in update password: ", user);
      user.password = this.hashPassword(
        password,
        faker.random.alphaNumeric(10)
      );
      await user.save();
      return new Response(true, null);
    } catch (error) {
      console.error(error);
      const errorUpdatingPassword = new ApiError(
        200,
        "Failed to updated password!"
      );
      return new Response(null, errorUpdatingPassword.getResponse());
    }
  }

  hashPassword(password: string, salt: string): string {
    return crypto.AES.encrypt(password, salt).toString();
  }
}

export default new UserController();
