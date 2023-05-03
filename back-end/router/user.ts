import express from "express";
const router = express.Router();
import playerController from "../controller/PlayerController";
import userController from "../controller/UserController";
import path from "path";
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import multer from "multer";
var fs = require("fs");
import { readFile } from "node:fs";
import verifyInput from "../utils/VerifyInput";
import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";
import cloudController from "../controller/CloudController";
// console.log("access key: ", process.env.AWS_ACCESS_KEY);
// console.log("s3 signed url is: ", cloudController.getSignedURLToUploadImage());

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    console.log("req.body in destination: ", req.body);
    cb(null, "assets/temp-images");
  },
  filename: (req: any, file: any, cb: any) => {
    console.log("file: ", file);
    const fileExtension = file.originalname.substring(
      file.originalname.indexOf(".")
    );
    const fileName =
      req.body.firstName + "-" + req.body.lastName + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

function renameProfilePicture(fileName: any) {
  readFile(`./assets/temp-images/${fileName}`, (err, data) => {
    if (err) throw err;
    console.log(data);
  });

  fs.rename(
    `./assets/temp-images/${fileName}`,
    `./assets/profile-pictures/${fileName}`,
    function (error: any, data: any) {
      if (error) {
        console.log("error in renaming: ", error);
      }
    }
  );
  return true;
}

router.post(
  "/user/create-user",
  upload.single("profilePicture"),
  async (req: any, res: any, next: any) => {
    console.log("came to create-player url!");
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    const verifiedInputs =
      userController.verifyRegistrationInputsFromAdmin(req);
    console.log("verifiedInputs: ", verifiedInputs);
    if (verifiedInputs.data === null) {
      const inputError = new ApiError(260, "Input is wrong!");
      const inputErrorResponse = new Response(null, inputError.getResponse());
      res.send(inputErrorResponse);
    } else {
      // console.log("first name type: ", isFirstNameString);
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let email = req.body.email;
      let password = req.body.password;
      let session = req.body.session;
      const signedURL = await cloudController.getSignedURLToUploadImage(
        session
      );
      const signedURLResponse = new Response(signedURL, null);
      res.send(signedURLResponse);
      // const user = await userController.register(
      //   firstName,
      //   lastName,
      //   email,
      //   password
      // );
      // res.send(user);
      // console.log("type of file: ", typeof req.file);
      // console.log("mime type of file: ", req.file.mimetype);
      // console.log("is file image: ", req.file.mimetype.includes("image"));
      // console.log("req.body in create player url: ", req.body);
      // console.log("req.file in create player url: ", req.file);
      // const fileExtension = req.file.originalname.substring(
      //   req.file.originalname.indexOf(".")
      // );
      // const fileName =
      //   req.body.firstName + "-" + req.body.lastName + fileExtension;

      // renameProfilePicture(fileName);
      // const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
      // const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
      // const bucketName = "nodejs-bucket-ayon";
      // const s3 = new AWS.S3({
      //   accessKeyId: AWS_ACCESS_KEY,
      //   secretAccessKey: AWS_SECRET_ACCESS_KEY,
      //   region: "us-east-1",
      // });
      // const bucketCreateparameters = {
      //   Bucket: bucketName,
      // };
      // console.log("req.file in s3: ", req.file);
      // const fileContent = fs.createReadStream(req.file);
      // console.log("file content in s3: ", fileContent);
      // s3.createBucket(bucketCreateparameters, function (err, data) {
      //   if (err) console.log(err, err.stack);
      //   else console.log("Bucket Created Successfully", data);
      // });
      // const fileInBinary = fs.readFileSync(
      //   `D:/Coding/angular/login-register/back-end/assets/profile-pictures/${fileName}`
      // );
      // console.log("fileInBinary: ", fileInBinary);
      // const fileUploadParameters = {
      //   Bucket: bucketName,
      //   Key: "123.png",
      //   Body: fileInBinary,
      // };
      // s3.upload(fileUploadParameters, function (err: any, data: any) {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log(`File uploaded successfully which is: ${data}`);
      // });
      // const isPlayerCreated = await playerController.createPlayer(
      //   firstName,
      //   lastName,
      //   email,
      //   profilePicture
      // );
      // console.log(
      //   "isPlayerCreated response from playercontroller: ",
      //   isPlayerCreated
      // );
      //   const loginRepsonse = await userController.login(email, password);
      //   console.log("login response from controller: ", loginRepsonse);
      //   res.send(loginRepsonse);
    }
  }
);
router.post("/user/login", async (req: any, res: any) => {
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

router.post("/validate", async (req: any, res: any, next: any) => {
  console.log("came to validate session!");
  const session = req.body.session;
  console.log("session in validate url: ", session);
  const isUserFoundWithSession = await userController.getUserWithSession(
    session
  );
  console.log("user with session in validate url: ", isUserFoundWithSession);
  if (isUserFoundWithSession.data === null) {
    const userNotFoundError = new ApiError(300, "User not found!");
    const userNotFoundResponse = new Response(
      null,
      userNotFoundError.getResponse()
    );
    res.send(userNotFoundResponse);
    next();
  } else {
    console.log(
      "user.data with session in validate url: ",
      isUserFoundWithSession.data
    );
    console.log(
      "user.data.dataValues with session in validate url: ",
      isUserFoundWithSession.data.dataValues
    );
    res.send(isUserFoundWithSession);
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

router.post("/user/get-profile-data", async (req: any, res: any) => {
  console.log("came in /user/get-profile-data!");
  const session = req.body.session;
  const user = await userController.getUserWithSession(session);
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

router.post("/user/make-admin", async (req: any, res: any) => {
  console.log("reached /user/make-admin url!");
  console.log("req is: ", req.body);
  let email = req.body.email;
  const currentUser = await userController.makeAdmin(email);
  res.send(currentUser);
});

router.post("/user/is-admin", async (req: any, res: any) => {
  console.log("reached /user/is-admin url!");
  console.log("req is: ", req.body);
  let session = req.body.session;
  const currentUser = await userController.isAdmin(session);
  res.send(currentUser);
});

module.exports = router;
