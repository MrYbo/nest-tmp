import {ConfigService} from "@nestjs/config";
import {utilities as nestWinstonModuleUtilities, WinstonModule, WinstonModuleOptions} from "nest-winston";
import winston from "winston";
import 'winston-daily-rotate-file';

export class AppLoggerModule {
	static forRootAsync() {
		return WinstonModule.forRootAsync({
			useFactory: AppLoggerModule.factory,
			inject: [ConfigService],
		})
	}

	private static factory(config: ConfigService): WinstonModuleOptions {
		const conf = config.get('logger');
		return {
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
							winston.format.timestamp(),
							winston.format.colorize(),
							winston.format.simple()
					)
				}),

				new winston.transports.DailyRotateFile({
					level: 'error',
					dirname: conf.dirname,
					filename: conf.errorFilename,
					datePattern: conf.datePattern,
					zippedArchive: conf.zippedArchive,
					maxSize: conf.maxSize,
					maxFiles: conf.maxFiles,
					format: winston.format.combine(
							winston.format.timestamp({
								format: 'YYYY-MM-DD HH:mm:ss'
							}),
							winston.format.json(),
					)
				}),

				new winston.transports.DailyRotateFile({
					level: 'info',
					dirname: conf.dirname,
					filename: conf.infoFilename,
					datePattern: conf.datePattern,
					zippedArchive: conf.zippedArchive,
					maxSize: conf.maxSize,
					maxFiles: conf.maxFiles,
					format: winston.format.combine(
							winston.format.timestamp({
								format: 'YYYY-MM-DD HH:mm:ss'
							}),
							nestWinstonModuleUtilities.format.nestLike('hui', {
								prettyPrint: true,
							}),
							winston.format.json(),
					)
				}),

			]
		}
	}
}
