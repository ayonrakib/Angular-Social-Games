import AWS from "aws-sdk";
import cloudController from "../controller/CloudController";
import imageController from "../controller/ImageController";
import userController from "../controller/UserController";
var fs = require("fs");
import { readFile } from "node:fs";
import ApiError from "../utils/exception";
import Response from "../utils/rest";
import express from "express";
const router = express.Router();

router.post("/image/get-signed-url", async (req: any, res: any) => {
  console.log("came into /image/get-signed-url!");
  const session = req.body.session;
  const signedURL = await cloudController.getSignedURLToUploadImage(session);
  const signedURLResponse = new Response(signedURL, null);
  res.send(signedURLResponse);
});

router.post("/image/assign-profile-picture-url", async (req: any, res: any) => {
  console.log("came into /image/assign-profile-picture-url!");
  const imageURL = req.body.url;
  const session = req.body.session;
  const user = await userController.getUserWithSession(session);
  const assignedProfilePicture = await imageController.assignProfilePictureURL(
    req.body.imageURL,
    user
  );
  console.log(
    "assignedProfilePicture in image route: ",
    assignedProfilePicture
  );
  res.send(assignedProfilePicture);
});

module.exports = router;
