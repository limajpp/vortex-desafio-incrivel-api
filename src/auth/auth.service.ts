import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  async createUser(name: string, email: string, password: string) {
    const doesGivenEmailAlreadyExist = (await this.repo.findOneBy({ email }))
      ? true
      : false;
    if (doesGivenEmailAlreadyExist)
      throw new BadRequestException(
        `The e-mail provided is already registered`,
      );

    const SALTS = 10;
    const hash = await bcrypt.hash(password, SALTS);
    const newUser = this.repo.create({ name, email, password: hash });

    return await this.repo.save(newUser);
  }
}
