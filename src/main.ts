import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import swagger from './boot/swagger';
import helmet from 'helmet';
import hmr from './boot/hmr';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      skipMissingProperties: false,
    }),
  );

  swagger(app);
  hmr(app);

  app.use(helmet());
  app.use(new LoggerMiddleware().use);

  await app.listen(3000);
}

bootstrap();
