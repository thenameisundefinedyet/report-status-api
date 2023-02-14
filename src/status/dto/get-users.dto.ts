import { IsNumber, IsString } from 'class-validator';

export class GetUsersDto {
  @IsString()
  code: string;

  @IsNumber()
  report: number;
}
