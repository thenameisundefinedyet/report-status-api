import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CounterService } from './counter.service';
import { CreateUpdateCounterDto } from './dto/create-update-counter.dto';
import { CounterEntity } from './counter.entity';
import { DeleteResult } from 'typeorm';

@Controller('counters')
export class CounterController {
  private readonly logger = new Logger(CounterController.name);
  constructor(private readonly counterService: CounterService) {}

  @Post()
  async create(
    @Body() createCounterDto: CreateUpdateCounterDto,
  ): Promise<CounterEntity> {
    try {
      return await this.counterService.create(createCounterDto);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAll(): Promise<Array<CounterEntity>> {
    try {
      return await this.counterService.getAll();
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: { id: number },
    @Body() updateCounterDto: CreateUpdateCounterDto,
  ): Promise<CounterEntity> {
    try {
      return await this.counterService.update(id, updateCounterDto);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param() { id }: { id: number }): Promise<DeleteResult> {
    try {
      return await this.counterService.delete(id);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }
}
