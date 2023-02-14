import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Put,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { LoginDto } from './dto/login.dto';
import { ReportDto } from './dto/report.dto';
import { LogoutDto } from './dto/logout.dto';
import { GetUsersDto } from './dto/get-users.dto';

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

  @Get('users')
  async getUsers(
    @Body() getUsersDto: GetUsersDto,
  ): Promise<Array<Partial<Status>>> {
    try {
      return await this.statusService.getUsers(getUsersDto);
    } catch (error) {
      this.logger.error(error.message, error.stack, error.context);
      throw new BadRequestException(error.message);
    }
  }
}
