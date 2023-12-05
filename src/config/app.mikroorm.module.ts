import { ConfigService } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Logger } from '@nestjs/common';

export class AppMikroormModule {
  static forRootAsync() {
    return MikroOrmModule.forRootAsync({
      useFactory: AppMikroormModule.factory,
      inject: [ConfigService],
    });
  }

  private static factory(configService: ConfigService): MikroOrmModuleOptions {
    const logger = new Logger('MikroORM');
    logger.log('-------数据库连接初始化---------');
    const sqlConfig = configService.get('database');
    return {
      driver: MySqlDriver,
      dbName: sqlConfig.dbName,
      host: sqlConfig.host,
      port: sqlConfig.port,
      user: sqlConfig.user,
      password: sqlConfig.password,
      debug: sqlConfig.debug,
      autoLoadEntities: true,
      // entities: ['dist/modules/**/entities/*.entity.js'],
      // entitiesTs: ['src/modules/**/entities/*.entity.ts'],
      logger: logger.log.bind(logger),
    };
  }
}
