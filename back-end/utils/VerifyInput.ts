class Validator {
  constructor() {}

  isInputString(input: any): boolean {
    return typeof input === "string" ? true : false;
  }

  isInputUndefined(input: any): boolean {
    return typeof input === undefined ? true : false;
  }

  isInputStringOrUndefined(input: any): boolean {
    return typeof input === "string" || undefined ? true : false;
  }

  isInputNumber(input: any): boolean {
    return typeof input === "number" ? true : false;
  }

  isInputImage(file: any): boolean {
    console.log("file is: ", file);
    return file.mimetype.includes("image") === true ? true : false;
  }
}

const verifyInput = new Validator();
export default verifyInput;
