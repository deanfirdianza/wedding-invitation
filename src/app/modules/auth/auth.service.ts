import { HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepositories } from './auth.repositories';
import { FilterQuery, Types } from 'mongoose';
import { UserRepositories } from '../user/user.repositories';
import { GenericExceptionFilter } from 'src/app/utils/filter/generic-exception.filter';
import { ErrorException } from 'src/app/shared/exception/error.exception';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from '../user/exception/notfound.exception';

@Injectable()
@UseFilters(GenericExceptionFilter)
export class AuthService {
  constructor(
    private readonly authRepositories: AuthRepositories,
    private readonly userRepositories: UserRepositories,
    private jwtService: JwtService,
  ) {}

  async verifyCredential(username: string, password: string): Promise<boolean> {
    try {
      const user = await this.userRepositories.findByUsername(username);

      if (!user) {
        throw new UserNotFoundException();
      }

      const isPasswordValid = await bcrypt.compare(password, user.hash);

      return isPasswordValid;
    } catch (error) {
      throw new ErrorException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async hashPassword(id: Types.ObjectId, password: string): Promise<FilterQuery<Document> | void> {
    try {
      const saltRounds: number = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const updatedUser = await this.authRepositories.storeHash(id, hash);
      
      return updatedUser;
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }

  async createAccessToken(username: string): Promise<string> {
    try {
      const payload = { sub: username };
      const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET_KEY });

      return token;
    } catch (error) {
      throw new ErrorException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}