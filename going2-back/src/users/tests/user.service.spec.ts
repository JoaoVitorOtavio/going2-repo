import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Users } from '../users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersController } from '../http/users.controller';
import { AbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

let usersService: UsersService;

const mockUsersRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
} as Record<string, jest.Mock>;

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    controllers: [UsersController],
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(Users),
        useValue: mockUsersRepo,
      },
      {
        provide: AbilityFactory,
        useValue: {
          defineAbility: jest.fn(),
        },
      },
    ],
  }).compile();

  usersService = moduleRef.get(UsersService);
});

describe('UserService', () => {
  it('Should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('Should find All Users', async () => {
    mockUsersRepo.find.mockResolvedValueOnce([]);

    const result = await usersService.findAll();
    expect(result).toEqual([]);
  });

  it('Should throw InternalServerErrorException when there is an error on findAll', async () => {
    mockUsersRepo.find.mockRejectedValueOnce(
      new InternalServerErrorException('Erro ao buscar usuários'),
    );

    await expect(usersService.findAll()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it("Should return notFoundException when user doesn't exist", async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce(undefined);

    await expect(usersService.remove(1)).rejects.toThrow(NotFoundException);
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockUsersRepo.delete).not.toHaveBeenCalled();
  });

  it('Should return badRequestException when there is an error on remove', async () => {
    mockUsersRepo.findOneBy.mockRejectedValueOnce(new BadRequestException());

    await expect(usersService.remove(1)).rejects.toThrow(BadRequestException);
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockUsersRepo.delete).not.toHaveBeenCalled();
  });

  it('Should remove an user', async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce({
      id: 1,
      name: 'mockedUser',
    });

    mockUsersRepo.delete.mockResolvedValueOnce(undefined);

    const result = await usersService.remove(1);

    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockUsersRepo.delete).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });
});
