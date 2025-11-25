import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './DTOs/register-dto';
import { AuthService } from './auth.service';
import { SerializeUser } from 'src/middlewares/user-serialization.interceptor';
import { UserSerializationDTO } from './DTOs/user-serialization-dto';

@Controller('auth')
@SerializeUser(UserSerializationDTO)
export class AuthController {
  constructor(private readonly serv: AuthService) {}

  @Post('/register')
  create(@Body() body: RegisterDto) {
    return this.serv.createUser(body.name, body.email, body.password);
  }
}
