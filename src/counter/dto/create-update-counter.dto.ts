import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUpdateCounterDto {
  @IsOptional()
  @IsString()
  target: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  destroyed: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  wounded: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  machinery: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  ammunition: number;

  @IsOptional()
  @IsString()
  coordinates: string;
}
