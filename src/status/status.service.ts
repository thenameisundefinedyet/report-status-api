import { Model } from 'mongoose';
import { Status, StatusDocument } from './status.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as randomstring from 'randomstring';
import { BadRequestException } from '@nestjs/common';
import { StatusEnum } from '../constants/status.enum';
import { ReportDto } from './dto/report.dto';
import { LogoutDto } from './dto/logout.dto';
import { GetUsersDto } from './dto/get-users.dto';

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

  async logout({ code, report }: LogoutDto): Promise<Partial<Status>> {
    const user = await this.statusModel.findOne({
      code,
    });

    if (user) {
      if (user.status === StatusEnum.IN) {
        user.status = StatusEnum.OUT;
        user.report = report;
        user.code = '';
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

  async getUsers({
    code,
    report,
  }: GetUsersDto): Promise<Array<Partial<Status>>> {
    const user = await this.statusModel.findOne({
      code,
    });

    if (user) {
      if (user.status === StatusEnum.IN && user.user === StatusEnum.ADMIN) {
        user.report = report;
        await user.save();
        const users = await this.statusModel.find();
        return users.map((user) => this.returnAllowedProperties(user));
      } else {
        throw new BadRequestException(
          'Статус або тип вашого аккаунту не вдалось ідентифікувати. Зверніться до адміністратора.',
        );
      }
    } else {
      throw new BadRequestException(
        'Ваш код не вдалось автентифікувати. Зверніться до адміністратора.',
      );
    }
  }

  returnAllowedProperties(user) {
    const res = JSON.parse(JSON.stringify(user));
    delete res._id;
    delete res.password;
    delete res.code;
    return res;
  }
}
