import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Users } from '../users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});
