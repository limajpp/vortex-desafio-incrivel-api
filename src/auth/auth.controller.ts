import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './DTOs/register-dto';
import { AuthService } from './auth.service';
import { SerializeUser } from 'src/middlewares/user-serialization.interceptor';
import { UserSerializationDTO } from './DTOs/user-serialization-dto';
import { SignInDTO } from './DTOs/signIn-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly serv: AuthService) {}

  @Post('/register')
  @SerializeUser(UserSerializationDTO)
  create(@Body() body: RegisterDto) {
    return this.serv.createUser(body.name, body.email, body.password);
  }

  @Post('/signIn')
  signIn(@Body() body: SignInDTO) {
    return this.serv.logIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
