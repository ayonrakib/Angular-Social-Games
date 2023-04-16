declare var require: any;
const expresAapp = require("express");
const router = expresAapp.Router();
const crypto = require("crypto-js");
const bcrypt = require("bcrypt");
const fs = require("fs");
import Response from "./utils/rest";
import ApiError from "./utils/exception";
import pollController from "./controller/PollController";
import userController from "./controller/UserController";
import voteTableController from "./controller/VoteTableController";
import faker from "faker";

router.get("/", (req: any, res: any) => {
  console.log("reached / url!");
  res.send("Server started!");
  res.end();
});

router.get("/get-users", async (req: any, res: any) => {
  console.log("reached /get-users url!");
  const users = await userController.getUsers();
  res.send(users);
});

router.get("/read-file", async (req: any, res: any) => {
  fs.readFile(
    "D:/Coding/angular/login-register/back-end/db-seed/users.csv",
    "utf8",
    (err: any, data: any) => {
      if (err) {
        console.error(err);
        return;
      }
      res.send(data);
    }
  );
});

router.get("/get-polls", async (req: any, res: any) => {
  console.log("reached /get-polls url!");
  const polls = await pollController.getPolls();
  res.send(polls);
});

router.post("/create-poll", async (req: any, res: any) => {
  console.log("reached /create-poll url!");
  console.log("req is: ", req.body);
  let pollDate = req.body.pollDate;
  let pollTime = req.body.pollTime;
  let pollLocation = req.body.pollLocation;
  if (pollDate != "" && pollTime != "" && pollLocation != "") {
    let poll = await pollController.createPoll(
      pollDate,
      pollTime,
      pollLocation
    );
    res.send(true);
  }
});

router.post("/cast-vote", async (req: any, res: any) => {
  console.log("came in cast vote url.");
  console.log("req is: ", req.body);
  const isVoteCast = await voteTableController.castVote(req.body);
  const response = new Response(true, null);
  res.send(response);
});

router.get("/get-votes", async (req: any, res: any) => {
  console.log("came in get votes url!");
  const votes = await voteTableController.getVotes();
  const response = new Response(votes, null);
  res.send(response);
});

router.post("/login", async (req: any, res: any) => {
  console.log("came to login url!");
  let email = req.body.email;
  let password = req.body.password;
  const loginResponseFromService = await userController.getUser(email);
  console.log("loginResponseFromService in login: ", loginResponseFromService);
  console.log(
    "loginResponseFromService.length: ",
    loginResponseFromService.length
  );
  if (loginResponseFromService.data === null) {
    res.send(loginResponseFromService);
  }
  //   const salt = getRandomizedString();
  //   const hashedPassword = hashPassword(password, getRandomizedString());
  //   console.log("hashed password is: ", hashedPassword);
  if (loginResponseFromService.data !== null) {
    const salt = bcrypt.genSaltSync(10);
    console.log("bcrypt salt: ", salt);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("bcrypt hash: ", hashedPassword);
    console.log(
      "bcrypt decrypt: ",
      bcrypt.compareSync("password", hashedPassword)
    );
    res.end();
  } else {
    // const errorResponse = ApiError.fromAPiError({
    //   errorCode: 100,
    //   errorMessage: "User not found!",
    // });
    // console.log("error response: ", errorResponse);
    // const userNotFoundResponse = new Response(null, errorResponse);
    // console.log("userNotFoundResponse: ", userNotFoundResponse);
    // res.send(userNotFoundResponse);
  }
});

router.post("/register", async (req: any, res: any) => {
  console.log("reached /register url!");
  console.log("req is: ", req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  const isUserFound = await userController.getUser(email);
  console.log("isUserFound in register: ", isUserFound);
  // this.createUser("", "", "", "", "", "");
  if (isUserFound.data) {
    const userFoundError = new ApiError(300, "User already exists!");
    const userFoundResponse = new Response(null, userFoundError.getResponse());
    res.send(userFoundResponse);
  } else {
    console.log("create user in register url!");
    const salt = faker.random.alphaNumeric(10);
    const hashedPassword = hashPassword(password, salt);
    const session = faker.random.alphaNumeric(10);
    const isUserCreated = await userController.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      salt,
      session
    );
    console.log("isUserCreated response in register: ", isUserCreated);
    if (isUserCreated.data) {
      const userCreatedResponse = new Response(session, null);
      res.send(userCreatedResponse);
    } else {
      const userNotCreatedError = new ApiError(
        500,
        "User failed to create! Please try again!"
      );
      const userNotCreatedResponse = new Response(
        null,
        userNotCreatedError.getResponse()
      );
      res.send(userNotCreatedResponse);
    }
  }
});

router.post("/get-user", async (req: any, res: any) => {
  console.log("reached /get-user url!");
  console.log("req is: ", req.body);
  const attribute = Number.isInteger(req.body.id)
    ? req.body.id
    : req.body.email;
  const user = await userController.getUser(attribute);
  res.send(user);
});

router.post("/delete-user", async (req: any, res: any) => {
  console.log("reached /delete-user url!");
  console.log("req is: ", req.body);
  let email = req.body.email;
  if (email != "") {
  }
});

router.post("/update-password", async (req: any, res: any) => {
  console.log("reached /update-password url!");
  console.log("req is: ", req.body);
  let email = req.body.email;
  if (email != "") {
    const isPasswordUpdated = await userController.updatePassword(
      email,
      "password"
    );
    console.log("is password updated: ", isPasswordUpdated);
    res.send(isPasswordUpdated);
  }
});

function getRandomizedString(): string {
  return Math.random().toString(36).substring(2, 7);
}

function hashPassword(password: string, salt: string): string {
  return crypto.AES.encrypt(password, salt).toString();
}

module.exports = router;
