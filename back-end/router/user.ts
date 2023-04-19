import express from "express";
const router = express.Router();
import userController from "../controller/UserController";

router.post("/login", async (req: any, res: any) => {
  console.log("came to login url!");
  let email = req.body.email;
  let password = req.body.password;
  const loginRepsonse = await userController.login(email, password);
  console.log("login response from controller: ", loginRepsonse);
  res.send(loginRepsonse);
});

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

router.post("/validate", async (req: any, res: any) => {
  console.log("came to validate session!");
  const session = req.body.session;
  console.log("session in validate url: ", session);
  const isUserFoundWithSession = await userController.getUserWithSession(
    session
  );
  console.log("user with session in validate url: ", isUserFoundWithSession);
  console.log(
    "user.data with session in validate url: ",
    isUserFoundWithSession.data
  );
  console.log(
    "user.data.dataValues with session in validate url: ",
    isUserFoundWithSession.data.dataValues
  );
  res.send(isUserFoundWithSession);
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

router.get("/get-users", async (req: any, res: any) => {
  console.log("reached /get-users url!");
  const users = await userController.getUsers();
  res.send(users);
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

module.exports = router;
