import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Users } from '../users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

let userService: UsersService;

beforeAll(async () => {
  const mockUsersRepo = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const app: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(Users),
        useValue: mockUsersRepo,
      },
    ],
  }).compile();

  userService = app.get<UsersService>(UsersService);
});

describe('UserService', () => {
  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('Should find All Users', async () => {
    userService.findAll = jest.fn().mockResolvedValueOnce({});

    const result = await userService.findAll();
    expect(result).toEqual({});
  });

  it('Should throw InternalServerErrorException when there is an error on findAll', async () => {
    userService.findAll = jest
      .fn()
      .mockRejectedValueOnce(
        new InternalServerErrorException('Erro ao buscar usuários'),
      );

    await expect(userService.findAll()).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
