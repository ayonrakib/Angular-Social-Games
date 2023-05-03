import dotenv from "dotenv";
dotenv.config();
import AWS, { S3 } from "aws-sdk";
var fs = require("fs");
import { readFile } from "node:fs";
import { randomBytes } from "crypto";

class CloudController {
  s3Controller: S3;
  bucketName = "nodejs-bucket-ayon";
  bucketCreateparameters = {
    Bucket: this.bucketName,
  };
  constructor() {
    const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
    const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    this.s3Controller = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: "us-east-1",
      signatureVersion: "v4",
    });
  }

  createBucket(): boolean {
    this.s3Controller.createBucket(
      this.bucketCreateparameters,
      function (err, data) {
        if (err) console.log(err, err.stack);
        else {
          console.log("Bucket Created Successfully: ", data);
          return true;
        }
      }
    );
    return false;
  }

  uploadImage(fileName: string): boolean {
    const fileInBinary = fs.readFileSync(
      `D:/Coding/angular/login-register/back-end/assets/profile-pictures/${fileName}`
    );
    const fileUploadParameters = {
      Bucket: this.bucketName,
      Key: "123.png",
      Body: fileInBinary,
    };
    this.s3Controller.upload(
      fileUploadParameters,
      function (err: any, data: any) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully which is: ${data}`);
        return true;
      }
    );
    return false;
  }

  getSignedURLToUploadImage(): string {
    const rawBytes = randomBytes(16);
    const imageName = rawBytes.toString("hex");

    const params = {
      Bucket: this.bucketName,
      Key: "125.png",
      Expires: 60,
      ContentType: "image/png",
    };
    const signedURL = this.s3Controller.getSignedUrl("putObject", params);
    return signedURL;
  }
}

const cloudController = new CloudController();
export default cloudController;
