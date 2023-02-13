import { Model } from 'mongoose';
import { Status, StatusDocument } from './status.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as randomstring from 'randomstring';
import { BadRequestException } from '@nestjs/common';
import { StatusEnum } from '../constants/status.enum';
import { ReportDto } from './dto/report.dto';

export class StatusService {
  constructor(
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  async login(loginDto: {
    password: number;
    report: number;
  }): Promise<Partial<Status>> {
    const user = await this.statusModel.findOne({
      password: loginDto.password,
    });

    if (user) {
      if (user.status === StatusEnum.IN) {
        throw new BadRequestException(
          'Користувач з паролем який ви ввели уже увійшов в аккаунт. Ви можите зайти в аккаунт тільки з одного пристрою. Якщо ви не входили в аккаунт - зверніться до адміністратора.',
        );
      } else {
        user.status = StatusEnum.IN;
        user.code = randomstring.generate(10);
        user.report = loginDto.report;
        const updatedUser = await user.save();
        const res = JSON.parse(JSON.stringify(updatedUser));
        delete res._id;
        delete res.password;
        delete res.status;
        delete res.updatedAt;
        return res;
      }
    } else {
      throw new BadRequestException(
        'Ви ввели не вірний пароль. Введіть пароль заново або зверніться до адміністратора якщо ви його забули.',
      );
    }
  }

  async report({ code, report }: ReportDto): Promise<Partial<Status>> {
    const user = await this.statusModel.findOne({
      code,
    });

    if (user) {
      if (user.status === StatusEnum.IN) {
        user.report = report;
        const updatedUser = await user.save();
        return { report: updatedUser.report };
      } else {
        throw new BadRequestException(
          'Статус вашого аккаунту не вдалось ідентифікувати. Зверніться до адміністратора.',
        );
      }
    } else {
      throw new BadRequestException(
        'Ваш код не вдалось автентифікувати. Зверніться до адміністратора.',
      );
    }
  }
  //
  // async getAll(): Promise<Array<Counter>> {
  //   return await this.counterRepository.find();
  // }
  //
  // async update(
  //   id: number,
  //  updateCounterDto: CreateUpdateStatusDto,
  // ): Promise<Counter> {
  //   const status = await this.getOneByIdOrFail(id);
  //   const newCounter = await this.counterRepository.create({
  //     ...status,
  //     ...updateCounterDto,
  //   });
  //   return await this.counterRepository.save(newCounter);
  // }
  //
  // async delete(id: number): any {
  //   const status = await this.getOneByIdOrFail(id);
  //   return await this.counterRepository.delete(status.id);
  // }
  //
  // async getOneByIdOrFail(id: number) {
  //   const status = await this.counterRepository.findOne({ where: { id } });
  //   if (!status) {
  //     throw new BadRequestException(`A status with id "${id}" does not exist`);
  //   }
  //   return status;
  // }
}
