declare var require: any;
const expresAapp = require("express");
const router = expresAapp.Router();
const crypto = require("crypto-js");
const bcrypt = require("bcrypt");
const fs = require("fs");
import pollController from "./controller/PollController";
import userController from "./controller/UserController";
import voteTableController from "./controller/VoteTableController";
import Response from "./utils/rest";
// import { login } from "./router/user";

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
  let owner_id = req.body.owner_id;
  if (pollDate != "" && pollTime != "" && pollLocation != "") {
    let poll = await pollController.createPoll(
      pollDate,
      pollTime,
      pollLocation,
      owner_id
    );
    res.send(poll);
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

// router.post("/login", async (req: any, res: any) => {
//   console.log("came to login url!");
//   let email = req.body.email;
//   let password = req.body.password;
//   const loginRepsonse = await userController.login(email, password);
//   console.log("login response from controller: ", loginRepsonse);
//   res.send(loginRepsonse);
// });

router.post("/register", async (req: any, res: any) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  const isUserRegistered = await userController.register(
    firstName,
    lastName,
    email,
    password
  );
  res.send(isUserRegistered);
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
  const deleteUserResponse = await userController.deleteUser(email);
  res.send(deleteUserResponse);
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
