import express from "express";
const router = express.Router();
import playerController from "../controller/PlayerController";
import userController from "../controller/UserController";
import path from "path";
import multer from "multer";
var fs = require("fs");
import { readFile } from "node:fs";

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
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // console.log("req.body in renameProfilePicture: ", req.body);
  // fs.readFile(`./assets/temp-images/${fileName}`, (err: any, data: any) => {
  //   if (err) throw err;
  //   console.log("image is: ", data);
  // });
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
  "/create-player",
  upload.single("profilePicture"),
  async (req: any, res: any, next: any) => {
    console.log("came to create-player url!");
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let session = req.body.session;
    let profilePicture = req.file;
    console.log("req.body in create player url: ", req.body);
    console.log("req.file in create player url: ", req.file);
    const fileExtension = req.file.originalname.substring(
      req.file.originalname.indexOf(".")
    );
    const fileName =
      req.body.firstName + "-" + req.body.lastName + fileExtension;
    renameProfilePicture(fileName);
    const isPlayerCreated = await playerController.createPlayer(
      firstName,
      lastName,
      email,
      profilePicture
    );
    console.log(
      "isPlayerCreated response from playercontroller: ",
      isPlayerCreated
    );
    //   const loginRepsonse = await userController.login(email, password);
    //   console.log("login response from controller: ", loginRepsonse);
    //   res.send(loginRepsonse);
  }
);

module.exports = router;
