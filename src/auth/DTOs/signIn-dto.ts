import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDTO {
  @ApiProperty({ example: 'john@email.com', description: 'E-mail' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password',
  })
  @IsStrongPassword()
  password: string;
}
