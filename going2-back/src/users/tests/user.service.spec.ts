import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Users } from '../users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersController } from '../http/users.controller';
import { AbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

let usersService: UsersService;
const MOCK_EMAIL = 'email@fake';
const MOCK_RESULT = {
  id: 1,
  name: 'mockedUser',
  password: '123',
};

const mockUsersRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
} as Record<string, jest.Mock>;

beforeAll(async () => {
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

beforeEach(() => {
  jest.resetAllMocks();
});

describe('UserService', () => {
  it('Should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('Should find All Users', async () => {
    mockUsersRepo.find.mockResolvedValueOnce([]);

    const result = await usersService.findAll();

    expect(mockUsersRepo.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('Should throw InternalServerErrorException when there is an error on findAll', async () => {
    mockUsersRepo.find.mockRejectedValueOnce(
      new InternalServerErrorException(),
    );

    await expect(usersService.findAll()).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUsersRepo.find).toHaveBeenCalledTimes(1);
  });

  it("Should return notFoundException when user doesn't exist on remove", async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce(undefined);

    try {
      await usersService.remove(1);
    } catch (error: unknown) {
      const err = error as HttpException;
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe('Usuário não encontrado');
    }

    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockUsersRepo.delete).not.toHaveBeenCalled();
  });

  it('Should return badRequestException when there is an error on remove', async () => {
    mockUsersRepo.findOneBy.mockRejectedValueOnce(new BadRequestException());

    await expect(usersService.remove(1)).rejects.toThrow(BadRequestException);
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
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
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockUsersRepo.delete).toHaveBeenCalledWith(1);
    expect(mockUsersRepo.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('Should find a user by email', async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce(MOCK_RESULT);

    const result = await usersService.findOneByEmail(MOCK_EMAIL);

    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ email: MOCK_EMAIL });
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(MOCK_RESULT);
  });

  it('Should throw notFoundException when user doesnt exist on find user by email', async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce(undefined);

    try {
      await usersService.findOneByEmail(MOCK_EMAIL);
      fail('should throw notFoundException');
    } catch (error: unknown) {
      const err = error as HttpException;
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe('Usuário não encontrado');
    }

    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ email: MOCK_EMAIL });
  });

  it('Should throw badRequestException when there is an error on find user by email', async () => {
    mockUsersRepo.findOneBy.mockRejectedValueOnce(new BadRequestException());

    await expect(usersService.findOneByEmail(MOCK_EMAIL)).rejects.toThrow(
      BadRequestException,
    );
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({ email: MOCK_EMAIL });
  });

  it('Should find a user by id', async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce(MOCK_RESULT);

    const result = await usersService.findOne(MOCK_RESULT.id);

    expect(result).toEqual({
      id: MOCK_RESULT.id,
      name: MOCK_RESULT.name,
    });
    expect(result).not.toHaveProperty('password');
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(MOCK_RESULT.id);
    expect(mockUsersRepo.findOneBy).toHaveBeenLastCalledWith({ id: 1 });
  });

  it('Should throw notFoundException when user doesnt exist on find user by id', async () => {
    mockUsersRepo.findOneBy.mockResolvedValueOnce(undefined);

    try {
      await usersService.findOne(MOCK_RESULT.id);
      fail('should throw notFoundException');
    } catch (error: unknown) {
      const err = error as HttpException;
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe('Usuário não encontrado');
    }

    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockUsersRepo.findOneBy).toHaveBeenCalledWith({
      id: MOCK_RESULT.id,
    });
  });

  it('Should throw BadRequestException when there is an error on find user by id', async () => {
    mockUsersRepo.findOneBy.mockRejectedValueOnce(new BadRequestException());

    await expect(usersService.findOne(MOCK_RESULT.id)).rejects.toThrow(
      BadRequestException,
    );

    expect(mockUsersRepo.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockUsersRepo.findOneBy).toHaveBeenLastCalledWith({
      id: MOCK_RESULT.id,
    });
  });
});
