const UserModel = require("../models/User");
const userSequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import crypto from "crypto-js";
import bcrypt from "bcrypt";
import verifyInput from "../utils/VerifyInput";
import { VoteType } from "../enum";

class UserController {
  constructor() {}

  async getUsers(): Promise<any> {
    const users = await UserModel.findAll();
    return users;
  }

  async getUserWithSession(
    session: string
  ): Promise<Response | typeof UserModel> {
    if (session === "") {
      const emptySessionError = new ApiError(450, "Session was empty!");
      const emptySessionResponse = new Response(
        null,
        emptySessionError.getResponse()
      );
      return emptySessionResponse;
    }
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
      // console.log("user found with id: ", user[0].dataValues);
      const response = new Response(user[0].dataValues, null);
      return response;
    } else {
      try {
        const user = await UserModel.findOne({
          where: {
            email: attribute,
          },
        });
        // console.log("user with email in get user method try block: ", user);
        if (user !== null) {
          console.log("found user!");
          const userFoundResponseresponse = new Response(user, null);
          return userFoundResponseresponse;
        } else {
          console.log("didnt find user!");
          const userNotFoundError = new ApiError(150, "User not found!");
          const userNotFoundResponse = new Response(
            null,
            userNotFoundError.getResponse()
          );
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
    // console.log("isuserfound in login of controller: ", isUserFound);
    if (isUserFound.data === null) {
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
      // const session = this.getRandomizedString();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        salt: salt,
        session: "",
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
    // console.log("isUserFound in register of user controller: ", isUserFound);
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

  async makeAdmin(email: string): Promise<boolean> {
    const currentUser = await UserModel.findOne({ where: { email: email } });
    console.log("current user in make admin method: ", currentUser);
    if (currentUser === null) {
      return false;
    }
    await currentUser.update({ role: "admin" });
    await currentUser.save();
    return true;
  }

  async isAdmin(session: string): Promise<Response> {
    const currentUser = await this.getUserWithSession(session);
    console.log("current user in is admin method: ", currentUser);
    console.log("current user.data in is admin method: ", currentUser.data);
    // console.log(
    //   "current user.data.dataValues in is admin method: ",
    //   currentUser.data.dataValues
    // );
    // console.log(
    //   "current user.data.dataValues.role in is admin method: ",
    //   currentUser.data.dataValues.role
    // );
    if (currentUser.data === null) {
      const userIsNotAdminError = new ApiError(150, "Wrong session!");
      const userIsNotAdminResponse = new Response(
        null,
        userIsNotAdminError.getResponse()
      );
      return userIsNotAdminResponse;
    }
    // await currentUser.update({ role: "admin" });
    // await currentUser.save();
    if (currentUser.data.dataValues.role === "admin") {
      const isAdminResponse = new Response(true, null);
      return isAdminResponse;
    } else {
      const isNotAdminResponse = new Response(false, null);
      return isNotAdminResponse;
    }
  }

  verifyRegistrationInputsFromAdmin(req: any): Response {
    let isFirstNameString = verifyInput.isInputString(req.body.firstName);
    let isLastNameString = verifyInput.isInputString(req.body.lastName);
    let isEmailString = verifyInput.isInputString(req.body.email);
    let isPasswordString = verifyInput.isInputString(req.body.password);
    // console.log(
    //   "isFirstNameString and isLastNameString and isEmailString and isPasswordStringOrUndefined and isSessionStringOrUndefined and isFileImage: ",
    //   isFirstNameString,
    //   isLastNameString,
    //   isEmailString,
    //   isPasswordStringOrUndefined,
    //   isSessionStringOrUndefined,
    //   isFileImage
    // );
    if (
      !(
        isFirstNameString &&
        isLastNameString &&
        isEmailString &&
        isPasswordString
      )
    ) {
      const inputError = new ApiError(260, "Input is wrong!");
      const inputErrorResponse = new Response(null, inputError.getResponse());
      return inputErrorResponse;
    }
    return new Response(true, null);
  }

  async createPlayer(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<Response> {
    const userCreatedResponse = await this.register(
      firstName,
      lastName,
      email,
      password
    );
    return userCreatedResponse;
  }

  hashPassword(password: string, salt: string): string {
    return crypto.AES.encrypt(password, salt).toString();
  }

  getRandomizedString(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  async getUsersWithVoteRecords(voteRecords: any): Promise<any> {
    const voteTypes: any = {
      yesVoters: [],
      noVoters: [],
      maybeVoters: [],
    };
    for (let index = 0; index < voteRecords.length; index++) {
      const user = await this.getUser(voteRecords[index]["userId"]);
      // enum use korte hobe, intermediate value use kora jabe na
      // intermediate value thakle enum define korte hobe
      // votetype naam e enum define kore use korte hobe
      // enum er value er sathe compare korbo
      enum voteType {
        yesType = "yes",
        noType = "no",
        maybeType = "maybe",
      }

      if (voteRecords[index]["voteType"] === voteType.yesType) {
        voteTypes["yesVoters"].push(user.data);
      } else if (voteRecords[index]["voteType"] === voteType.noType) {
        voteTypes["noVoters"].push(user.data);
      } else {
        voteTypes["maybeVoters"].push(user.data);
      }
    }
    const response = new Response(voteTypes, null);
    return response;
  }
}

export default new UserController();
