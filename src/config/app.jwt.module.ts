import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

export class AppJwtModule {
  static registerAsync() {
    return JwtModule.registerAsync({
      useFactory: AppJwtModule.factory,
      inject: [ConfigService],
    });
  }

  private static factory(configService: ConfigService): JwtModuleOptions {
    const jwtConfig = configService.get('jwt');

    return {
      global: true,
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    };
  }
}
