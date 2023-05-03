import multer from "multer";
var fs = require("fs");
import { readFile } from "node:fs";
import userController from "./UserController";
const UserModel = require("../models/User");
import ApiError from "../utils/exception";
import Response from "../utils/rest";

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

class ImageController {
  constructor() {}

  getFileExtension(req: any) {}

  async assignProfilePictureURL(
    imageURL: string,
    user: typeof UserModel
  ): Promise<Response> {
    try {
      await user.data.update({ profilePicture: imageURL });
      await user.data.save();
      const successfullyUploadedResponse = new Response(true, null);
      return successfullyUploadedResponse;
    } catch (error) {
      const failedToUploadError = new ApiError(
        560,
        "Failed to upload! Please try again!"
      );
      const failedToUploadResponse = new Response(
        null,
        failedToUploadError.getResponse()
      );
      return failedToUploadResponse;
    }
  }
}

const imageController = new ImageController();
export default imageController;
