export default class ApiError extends Error {
    constructor(code: number, message: string){
        super(message);
    }

    static fromAPiError(apiError:any){
        let error: any;
        if(apiError !== null){
            error = new ApiError(apiError.errorCode, apiError.message);
        }
        return error;
    }
}