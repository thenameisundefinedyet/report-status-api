import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
const bootstrap = async (): Promise<void> => {
  const PORT = process.env.API_PORT || 4001;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
  logger.log(`The app started on the port ${PORT}`);
};

bootstrap();
