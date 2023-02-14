import { IsNumber, IsString } from 'class-validator';

export class LogoutDto {
  @IsString()
  code: string;

  @IsNumber()
  report: number;
}
