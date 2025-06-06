import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: { email: string; password: string }) {
    const userOnDb = await this.usersService.findOneByEmail(user.email);

    if (userOnDb && userOnDb.password === user.password) {
      const result: Partial<UserDTO> = { ...userOnDb };

      delete result.password;

      return {
        user: result,
        token: this.jwtService.sign(result),
      };
    }

    throw new UnauthorizedException();
  }
}
