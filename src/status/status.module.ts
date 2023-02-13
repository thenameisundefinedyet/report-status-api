import { Module } from '@nestjs/common';
import { Status, StatusSchema } from './status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
