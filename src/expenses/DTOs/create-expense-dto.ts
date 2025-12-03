import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateExpenseDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0.01)
  @Max(99999999.99, { message: 'Amount is too large (max: 99,999,999.99)' })
  @IsDateString()
  date: string;
}
