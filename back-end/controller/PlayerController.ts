const PollModel = require("../models/Poll");
const pollSequelize = require("../mariadb");
import ApiError from "../utils/exception";
import Response from "../utils/rest";

class PlayerController {
  constructor() {}

  async createPlayer(
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: any
  ): Promise<boolean> {
    console.log(
      "player details in create player method are: ",
      firstName,
      lastName,
      email,
      profilePicture
    );
    return true;
  }
}

export default new PlayerController();
