/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllUser } from '../all-user/entities/all-user.entity';
import { AllUsersService } from 'src/all-user/all-user.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AllUser)
    private allUserRepository: Repository<AllUser>,
    private readonly allUserService: AllUsersService,
    private jwtServices: JwtService,
  ) {}

  // async validateUser(username: string, password: string): Promise<AllUser> {
  //   return await this.allUserRepository.findOne({ where: { username, password } });
  // }

  async validateUser(
    username: string,
    password: string,
  ): Promise<AllUser | null> {
    const user = await this.allUserRepository.findOne({ where: { username } });

    if (!user) {
      // User not found
      return null;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, return the user
      return user;
    } else {
      // Passwords don't match
      return null;
    }
  }

  async login(user: any) {
    const userInDb = await this.validateUser(user.username, user.password);
    if (!userInDb) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtServices.sign(payload),
    };
  }
}
