import {Inject, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from 'winston';
import {getReqMainInfo} from "../common/utils";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(
			@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {
	}

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.info('request', {req: getReqMainInfo(req)});
		next();
	}

}
