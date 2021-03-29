import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
}

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(entity => entity),
    save: jest.fn(entity => entity)
  })
);

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        },
        {
          provide: 'JwtService',
          useValue: { sign: jest.fn(() => 'abcd') }
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should create and log in a new user', async () => {
    const userDto: CreateUserDto = {
      username: 'test_user',
      name: 'Test User',
      password: 'dummy_password',
    }

    const user = {
      id: 1,
      username: 'test_user',
      name: 'Test User',
      isAdmin: false
    }

    repositoryMock.save.mockReturnValue(user);
//    expect(repositoryMock.save).toBeCalled();

    const { id, accessToken, refreshToken } = await service.create(userDto);

    expect(id).toBe(1);
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });
});
