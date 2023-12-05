import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseStruct } from '../../interface/response.struct';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const message = exception.getResponse().message;
    const path = request.url;
    const resBody: ResponseStruct = {
      statusCode: status,
      success: false,
      timestamp: new Date().toISOString(),
      message,
      path,
    };

    response.status(HttpStatus.OK).json(resBody);
  }
}
