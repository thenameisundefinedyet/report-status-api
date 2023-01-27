import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../db/data-source';
import { CounterModule } from '../counter/counter.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CounterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
