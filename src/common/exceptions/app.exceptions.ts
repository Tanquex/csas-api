import { HttpException, HttpServer, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException {
    constructor(
        public readonly message:string,
        private readonly statusCode:HttpStatus= HttpStatus.BAD_REQUEST,
        private readonly errorCode: string
    ){
        super(message, statusCode);
    }

}