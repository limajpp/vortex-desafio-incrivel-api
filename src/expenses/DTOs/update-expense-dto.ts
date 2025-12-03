import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateExpenseDTO {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0.01)
  @Max(99999999.99, { message: 'Amount is too large (max: 99,999,999.99)' })
  @IsOptional()
  date?: string;
}
