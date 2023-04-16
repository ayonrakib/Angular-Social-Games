import ApiError from "./exception";

export default class Response {
  constructor(
    public data: any,
    public error: { errorCode: number; errorMessage: string } | null
  ) {}
}
