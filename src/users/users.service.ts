import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CryptConfig } from '../config/crypt.config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(userDto: CreateUserDto) {
    const user = new User();
    const plaintextPassword = userDto.password;

    user.username = userDto.username;
    user.name = userDto.name;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(plaintextPassword, CryptConfig.saltRounds);
    user.hashedPassword = hashedPassword;

    // Create new user record
    const newUser = await this.usersRepository.save(user);

    const accessToken = await this.generateAccessToken(newUser);
    const refreshToken = await this.generateRefreshToken(newUser);

    this.setCurrentRefreshToken(newUser.id, refreshToken);

    return {
      id: newUser.id,
      accessToken,
      refreshToken
    }
  }

  async find(userId: number): Promise<User> {
    return this.usersRepository.findOne(userId);
  }

  async setCurrentRefreshToken(userId: number, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, CryptConfig.saltRounds);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken
    });
  }

  // Generate new JWT access token
  async generateAccessToken(user: User) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      secret: CryptConfig.accessTokenSecret,
      expiresIn: CryptConfig.accessTokenExpiresIn
    });
  }

  // Generate new JWT refresh token
  async generateRefreshToken(user: User) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      secret: CryptConfig.refreshTokenSecret,
      expiresIn: CryptConfig.refreshTokenExpiresIn
    });
  }
}
