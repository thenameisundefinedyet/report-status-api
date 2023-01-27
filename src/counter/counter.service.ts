import { InjectRepository } from '@nestjs/typeorm';
import { CounterEntity } from './counter.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUpdateCounterDto } from './dto/create-update-counter.dto';
import { BadRequestException } from '@nestjs/common';

export class CounterService {
  constructor(
    @InjectRepository(CounterEntity)
    private readonly counterRepository: Repository<CounterEntity>,
  ) {}

  async create(
    createCounterDto: CreateUpdateCounterDto,
  ): Promise<CounterEntity> {
    const counter = await this.counterRepository.create(createCounterDto);
    return await this.counterRepository.save(counter);
  }

  async getAll(): Promise<Array<CounterEntity>> {
    return await this.counterRepository.find();
  }

  async update(
    id: number,
    updateCounterDto: CreateUpdateCounterDto,
  ): Promise<CounterEntity> {
    const counter = await this.getOneByIdOrFail(id);
    const newCounter = await this.counterRepository.create({
      ...counter,
      ...updateCounterDto,
    });
    return await this.counterRepository.save(newCounter);
  }

  async delete(id: number): Promise<DeleteResult> {
    const counter = await this.getOneByIdOrFail(id);
    return await this.counterRepository.delete(counter.id);
  }

  async getOneByIdOrFail(id: number) {
    const counter = await this.counterRepository.findOne({ where: { id } });
    if (!counter) {
      throw new BadRequestException(`A counter with id "${id}" does not exist`);
    }
    return counter;
  }
}
