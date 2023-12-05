import { ConfigModule } from '@nestjs/config';
import defaultConfig from './env/default';
import { DynamicModule, Logger } from '@nestjs/common';
import { isProd } from '../common/utils';

export class AppConfigModule {
  static forRoot(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfigModule.loader],
    });
  }

  private static loader(): object {
    const logger = new Logger('config');
    logger.log('----初始化配置文件----');
    const defaultCof: object = defaultConfig();

    if (isProd) {
      const productionCof: object = import('./env/prod');
      return { ...defaultCof, productionCof };
    }
    return defaultCof;
  }
}
