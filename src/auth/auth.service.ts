import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  async createUser(name: string, email: string, password: string) {
    const doesGivenEmailAlreadyExists = (await this.repo.findOneBy({ email }))
      ? true
      : false;
    if (doesGivenEmailAlreadyExists)
      throw new BadRequestException(
        `The e-mail provided is already registered`,
      );

    const newUser = this.repo.create({ name, email, password });
    return await this.repo.save(newUser);
  }
}
