export default class ApiError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
  // input: error code int, error message str
  // return error format in JS obj
  // method: get error format
  //  1. return { errorCode: code, errorMessage: message }

  getResponse(): {
    errorCode: number;
    errorMessage: string;
  } {
    return {
      errorCode: this.code,
      errorMessage: this.message,
    };
  }
}
