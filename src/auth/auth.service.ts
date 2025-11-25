import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}
  async createUser(name: string, email: string, password: string) {
    const doesGivenEmailAlreadyExist = (await this.repo.findOneBy({ email }))
      ? true
      : false;
    if (doesGivenEmailAlreadyExist)
      throw new BadRequestException(
        `The e-mail provided is already registered.`,
      );

    const SALTS = 10;
    const hash = await bcrypt.hash(password, SALTS);
    const newUser = this.repo.create({ name, email, password: hash });

    return await this.repo.save(newUser);
  }

  async logIn(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user)
      throw new BadRequestException(`The e-mail provided is not registered.`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException(
        `Password is incorrect. Please try again.`,
      );

    const payload = { sub: user.id, userName: user.name };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
