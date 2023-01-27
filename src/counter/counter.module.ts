import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterEntity } from './counter.entity';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';
@Module({
  imports: [TypeOrmModule.forFeature([CounterEntity])],
  controllers: [CounterController],
  providers: [CounterService],
})
export class CounterModule {}
