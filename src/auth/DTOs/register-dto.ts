import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsName } from 'src/decorators/is-name.decorator';
import { IsNoEmoji } from 'src/decorators/is-no-emoji.decorator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsName()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNoEmoji({ message: 'Password cannot contain emojis' })
  password: string;
}
