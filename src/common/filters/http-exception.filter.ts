import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject} from '@nestjs/common';
import {ApiExceptions} from '../exceptions/api.exceptions';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {getReqMainInfo} from "../utils";

export interface ApiError {
	id: string;
	message: string;
	timestamp: Date;
	success: boolean;
	status: HttpStatus;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(
			@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
	) {
	}

	catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		let body: ApiError;
		let status: HttpStatus;
		let message: string;
		if (
				exception instanceof ApiExceptions ||
				exception instanceof HttpException
		) {
			status = exception.getStatus();
			message = exception.getResponse()['message'];

		} else {
			// 对于所有其他异常，只需返回500错误
			message = 'Internal error occurred';
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		body = new ApiExceptions(message, status);
		// 日志将包含错误标识符以及发生错误的请求路径
		this.logger.error(message, {status, req: getReqMainInfo(request)});

		response.status(HttpStatus.OK).json(body);
	}
}
