import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { BadRequestException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let repo: any;
  let jwtService: any;

  beforeEach(async () => {
    const repoMock = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const jwtMock = {
      signAsync: jest.fn().mockResolvedValue('fake_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: repoMock,
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user with a hashed password', async () => {
      repo.findOneBy.mockResolvedValue(null);
      const userDto = {
        name: 'Test',
        email: 'test@email.com',
        password: 'hashed_password',
      };
      repo.create.mockReturnValue({ id: 1, ...userDto });
      repo.save.mockResolvedValue({ id: 1, ...userDto });

      const result = await service.createUser(
        'Test',
        'test@email.com',
        '123456',
      );

      expect(repo.findOneBy).toHaveBeenCalledWith({ email: 'test@email.com' });
      expect(repo.save).toHaveBeenCalled();
      expect(result.password).toBe('hashed_password');
    });

    it('should throw BadRequestException if email already exists', async () => {
      repo.findOneBy.mockResolvedValue({ id: 1, email: 'test@email.com' });

      await expect(
        service.createUser('Test', 'test@email.com', '123456'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('logIn', () => {
    it('should return a token if credentials are valid', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@email.com',
        password: 'hashed_password',
      };
      repo.findOneBy.mockResolvedValue(user);

      const result = await service.logIn('test@email.com', '123456');

      expect(result).toEqual({ access_token: 'fake_token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 1,
        userName: 'Test User',
      });
    });

    it('should throw BadRequestException if user does not exist', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.logIn('wrong@email.com', '123')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
