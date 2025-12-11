import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IsNoEmoji } from 'src/decorators/is-no-emoji.decorator';

export class UpdateExpenseDTO {
  @ApiProperty({
    example: 'A new expense description',
    description: 'description',
  })
  @IsString()
  @IsOptional()
  @IsNoEmoji({ message: 'Description cannot contain emojis' })
  description?: string;

  @ApiProperty({ example: '5000', description: 'amount' })
  @IsNumber()
  @IsOptional()
  @Min(0.01)
  @Max(99999999.99, { message: 'Amount is too large (max: 99,999,999.99)' })
  amount: number;

  @ApiProperty({ example: '28/08/2002', description: 'date' })
  @IsOptional()
  date?: string;
}
