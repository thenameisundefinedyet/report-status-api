import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Put,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { LoginDto } from './dto/login.dto';
import { ReportDto } from './dto/report.dto';
import { LogoutDto } from './dto/logout.dto';

@Controller('statuses')
export class StatusController {
  private readonly logger = new Logger(StatusController.name);
  constructor(private readonly statusService: StatusService) {}

  @Put('login')
  async login(@Body() loginDto: LoginDto): Promise<Partial<Status>> {
    try {
      return await this.statusService.login(loginDto);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }

  @Put('report')
  async report(@Body() reportDto: ReportDto): Promise<Partial<Status>> {
    try {
      return await this.statusService.report(reportDto);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }

  @Put('logout')
  async logout(@Body() logOut: LogoutDto): Promise<Partial<Status>> {
    try {
      return await this.statusService.logout(logOut);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }

  //
  // @Get()
  // async getAll(): Promise<Array<Counter>> {
  //   try {
  //     return await this.counterService.getAll();
  //   } catch (error) {
  //     this.logger.error(error.message, error.stack, error.context);
  //     throw new BadRequestException(error.message);
  //   }
  // }
  //
  // @Put(':id')
  // async update(
  //   @Param() { id }: { id: number },
  //   @Body() updateCounterDto: CreateUpdateStatusDto,
  // ): Promise<Counter> {
  //   try {
  //     return await this.counterService.update(id, updateCounterDto);
  //   } catch (error) {
  //     this.logger.error(error.message, error.stack, error.context);
  //     throw new BadRequestException(error.message);
  //   }
  // }
  //
  // @Delete(':id')
  // async delete(@Param() { id }: { id: number }): Promise<DeleteResult> {
  //   try {
  //     return await this.counterService.delete(id);
  //   } catch (error) {
  //     this.logger.error(error.message, error.stack, error.context);
  //     throw new BadRequestException(error.message);
  //   }
  // }
}
