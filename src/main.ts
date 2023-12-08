import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from '@nestjs/common';
import swagger from './boot/swagger';
import helmet from 'helmet';
import hmr from './boot/hmr';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
	});

	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	swagger(app);
	hmr(app);

	app.use(helmet());

	await app.listen(3000);
}

bootstrap();
