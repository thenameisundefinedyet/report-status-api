import { IsNumber, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  code: string;

  @IsNumber()
  report: number;
}
