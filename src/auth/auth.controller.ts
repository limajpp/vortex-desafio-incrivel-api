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
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly serv: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 201, description: 'User was created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or e-mail provided already exist.',
  })
  @SerializeUser(UserSerializationDTO)
  create(@Body() body: RegisterDto) {
    return this.serv.createUser(body.name, body.email, body.password);
  }

  @Post('/signIn')
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({
    status: 200,
    description: 'Login was successfull. Returns JWT Token.',
  })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  signIn(@Body() body: SignInDTO) {
    return this.serv.logIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get logged user profile.' })
  @ApiResponse({ status: 200, description: 'Returns logged user data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return req.user;
  }
}
