import { IsNumber } from 'class-validator';

export class LoginDto {
  @IsNumber()
  password: number;

  @IsNumber()
  report: number;
}
