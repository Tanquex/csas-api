import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { timestamp } from "rxjs";
import { LogsService } from "../services/logs.service";

@Catch()
export class AllExceptionfilter implements ExceptionFilter{
    constructor(private readonly logsService: LogsService) {}
    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request= ctx.getRequest<Request>();

        const status= exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

        // FIXME: almacenar en la base de datos
        const errorText = typeof message == 'string'
            ? message
            : (message as any).message || JSON.stringify(message);

        const errorCode = exception.code || exception.name || 'UNKNOWN_ERROR';

        // 
        const user = (request as any).user;

       this.logsService.createLog({
            statusCode: status,
            path: request.url,
            error: errorText,
            errorCode: errorCode,
            session_id: user?.sub || null
        }).catch(err => console.error('Error guardando log:', err));


        //respuesta del servidor
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: typeof message == 'string' 
            ? message 
            : (message as any).message || message,
            errorCode: (exception as any).code || 'UKNOWN_ERROR'
        });
    }

}