import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateExpenseDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;
}
