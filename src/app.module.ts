import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ManagerModule } from './modules/manager/manager.module';
import { AppConfigModule } from './config/app.config.module';
import { AppMikroormModule } from './config/app.mikroorm.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionModule } from './modules/permission/permission.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    AppConfigModule.forRoot(),
    AppMikroormModule.forRootAsync(),
    AdminModule,
    ManagerModule,
    AuthModule,
    RolesModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
