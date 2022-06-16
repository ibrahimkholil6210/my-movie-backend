import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('List you favourite movie')
    .setVersion('1.0')
    .addTag('Movie')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000, () => console.log('Server is running on port 4000'));
}
bootstrap();
