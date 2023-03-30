import ApiError from "./exception";

export default class Response {
    constructor(public data:any, public error: ApiError|null){
        
    }
}