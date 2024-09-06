import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
