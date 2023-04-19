const UserModel = require("../models/User");
const userSequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import crypto from "crypto-js";
import bcrypt from "bcrypt";
import getErrorFormat from "../utils/error";
import faker from "faker";

class UserController {
  constructor() {}

  async getUsers(): Promise<any> {
    const users = await UserModel.findAll();
    return users;
  }

  async getUserWithSession(session: string): Promise<Response> {
    const isUserFound = await UserModel.findOne({
      where: { session: session },
    });
    if (isUserFound === null) {
      const sessionNotFoundError = new ApiError(530, "Wrong session!");
      const sessionNotFoundResponse = new Response(
        null,
        sessionNotFoundError.getResponse()
      );
      return sessionNotFoundResponse;
    }
    return new Response(isUserFound, null);
  }

  async getUser(attribute: number | string): Promise<Response> {
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
          const userFoundResponseresponse = new Response(user, null);
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

  async login(email: string, password: string): Promise<Response> {
    const isUserFound = await this.getUser(email);
    console.log("isuserfound in login of controller: ", isUserFound);
    console.log("isuserfound.data in login of controller: ", isUserFound.data);
    console.log(
      "isuserfound.data.dataValues in login of controller: ",
      isUserFound.data.dataValues
    );
    console.log(
      "isuserfound.error in login of controller: ",
      isUserFound.error
    );
    if (isUserFound.data === false) {
      const loginError = new ApiError(500, "User not found! Please try again!");
      const loginErrorResponse = new Response(null, loginError.getResponse());
      return loginErrorResponse;
    }
    if (bcrypt.compareSync(password, isUserFound.data.dataValues.password)) {
      const session = this.getRandomizedString();
      await isUserFound.data.update({ session: session });
      await isUserFound.data.save();
      const authenticatedResponse = new Response(session, null);
      return authenticatedResponse;
    }
    const authenticationFailedError = new ApiError(
      520,
      "Wrong credentials! Please try again!"
    );
    const authenticationErrorResponse = new Response(
      null,
      authenticationFailedError.getResponse()
    );
    return authenticationErrorResponse;
    // return true;
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<ApiError | typeof UserModel> {
    console.log("came to create user!");
    try {
      const salt = bcrypt.genSaltSync(10);
      const session = this.getRandomizedString();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        salt: salt,
        session: session,
      });
      if (user instanceof UserModel) {
        const userCreatedResponse = new Response(user, null);
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

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> {
    console.log("came in register of user controller!");
    const isUserFound = await this.getUser(email);
    console.log("isUserFound in register of user controller: ", isUserFound);
    if (isUserFound.data) {
      const userExistsError = new ApiError(600, "User already exists!");
      const userExistsResponse = new Response(
        null,
        userExistsError.getResponse()
      );
      return userExistsResponse;
    }
    const isUserCreated = await this.createUser(
      firstName,
      lastName,
      email,
      password
    );
    return isUserCreated;
  }

  async deleteUser(email: string): Promise<Response> {
    console.log("came to delete user!");
    try {
      const user = await this.getUser(email);
      console.log("user in deleteUser in controller: ", user);
      if (user.data !== null && user.data !== false) {
        await user.data.destroy();
      }
      const deletedUserResponse = new Response(true, null);
      return deletedUserResponse;
    } catch (error) {
      const failedToDeleteError = new ApiError(
        400,
        "Couldnt connect to database! Please try again!"
      );
      const failedToDeleteResponse = new Response(
        null,
        failedToDeleteError.getResponse()
      );
      return failedToDeleteResponse;
    }
  }

  async updatePassword(email: string, password: string): Promise<Response> {
    console.log("came in update password with email: ", email);
    try {
      const user = await UserModel.findOne({ where: { email: email } });
      console.log("user with email in update password: ", user);
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      console.log("salt and pass is: ", salt, password);
      await user.update({ salt: salt });
      await user.update({ password: hashedPassword });
      // user.salt = salt;
      // user.password = password;
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

  getRandomizedString(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}

export default new UserController();
