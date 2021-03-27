import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CryptConfig } from '../config/crypt.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

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
