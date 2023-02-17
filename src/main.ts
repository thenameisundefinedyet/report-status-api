import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('Main');
const bootstrap = async (): Promise<void> => {
  const PORT = 8080;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  logger.log(`The app started on the port ${PORT}`);
};

bootstrap();
