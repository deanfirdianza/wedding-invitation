// src/filters/generic.filter.ts

import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("Generic Interceptor Process");
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      // If it's a known HttpException, extract status and message
      status = exception.getStatus();
      message = exception.message;
    } else {
      // If it's an unknown exception, set a generic status and message
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    response.status(status).json({
      path: ctx.getRequest().url,
      statusCode: status,
      result: exception.name,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
