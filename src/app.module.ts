import {MiddlewareConsumer, Module, RequestMethod, ValidationPipe} from '@nestjs/common';
import {AdminModule} from './modules/admin/admin.module';
import {ManagerModule} from './modules/manager/manager.module';
import {AppConfigModule} from './config/app.config.module';
import {AppMikroormModule} from './config/app.mikroorm.module';
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {AuthModule} from './modules/auth/auth.module';
import {RolesModule} from './modules/roles/roles.module';
import {PermissionModule} from './modules/permission/permission.module';
import {HttpExceptionFilter} from './common/filters/http-exception.filter';
import {ResponseInterceptor} from './common/interceptors/response.interceptor';
import {AuthGuard} from './common/guards/auth.guard';
import {AppLoggerModule} from "./config/app.logger.module";
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {RolesGuard} from "./common/guards/roles.guard";

@Module({
	imports: [
		AppConfigModule.forRoot(),
		AppMikroormModule.forRootAsync(),
		AdminModule,
		ManagerModule,
		AuthModule,
		RolesModule,
		PermissionModule,
		AppLoggerModule.forRootAsync(),
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				stopAtFirstError: true,
				whitelist: true,
				transform: true,
			}),
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {
	// 应用全局中间件
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
	}
}
