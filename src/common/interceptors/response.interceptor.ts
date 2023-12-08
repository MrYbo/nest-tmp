import {CallHandler, ExecutionContext, Inject, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {getReqMainInfo} from "../utils";


export class ResponseInterceptor implements NestInterceptor {
	constructor(
			@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {
	}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		return next.handle().pipe(map((data) => {
			this.logger.info('response', {responseData: data, req: getReqMainInfo(request)});
			return {
				success: true,
				statusCode: response.statusCode,
				timestamp: new Date().toISOString(),
				data,
			}
		}));
	}
}
