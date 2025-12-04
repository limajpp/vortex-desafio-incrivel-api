import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IsNoEmoji } from 'src/decorators/is-no-emoji.decorator';

export class UpdateExpenseDTO {
  @IsString()
  @IsOptional()
  @IsNoEmoji({ message: 'Description cannot contain emojis' })
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0.01)
  @Max(99999999.99, { message: 'Amount is too large (max: 99,999,999.99)' })
  amount: number;

  @IsOptional()
  date?: string;
}
