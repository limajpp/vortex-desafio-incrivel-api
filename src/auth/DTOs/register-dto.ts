import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsName } from 'src/decorators/is-name.decorator';

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
  password: string;
}
