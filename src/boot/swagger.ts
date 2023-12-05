import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export default (app) => {
    const options = new DocumentBuilder()
        .setTitle('hui test')
        .setDescription('hui test document')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document)
}
