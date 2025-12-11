import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsName } from 'src/decorators/is-name.decorator';
import { IsNoEmoji } from 'src/decorators/is-no-emoji.decorator';

export class RegisterDto {
  @ApiProperty({ example: 'John', description: 'Fullname' })
  @IsString()
  @IsNotEmpty()
  @IsName()
  name: string;

  @ApiProperty({ example: 'john@email.com', description: 'E-mail' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password',
  })
  @IsString()
  @IsStrongPassword()
  @IsNoEmoji({ message: 'Password cannot contain emojis' })
  password: string;
}
