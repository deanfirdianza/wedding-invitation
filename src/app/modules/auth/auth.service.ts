import { HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepositories } from './auth.repositories';
import { FilterQuery, Types } from 'mongoose';
import { UserRepositories } from '../user/user.repositories';
import { CredentialFailedException } from './exception/credential-failed.exception';
import { GenericExceptionFilter } from 'src/app/utils/filter/generic-exception.filter';
import { ErrorException } from 'src/app/shared/exception/error.exception';

@Injectable()
@UseFilters(GenericExceptionFilter)
export class AuthService {
  constructor(
    private readonly authRepositories: AuthRepositories,
    private readonly userRepositories: UserRepositories,
  ) {}

  async login(username: string, password: string): Promise<boolean> {
    // Get user from username
    const user = await this.userRepositories.findByUsername(username)
    let result: boolean;

    if (user != null) {
      result = await bcrypt.compare(password, user.hash).then(function(result) {
        return result
      }).catch((err) => {
        throw new ErrorException(err, HttpStatus.UNPROCESSABLE_ENTITY)
      });
    } else {
      throw new CredentialFailedException();
    }
    
    return result;
  }

  async logout() {
    console.log("logout service")
  }

  async hashPassword(id: Types.ObjectId, password: string): Promise<FilterQuery<Document>|void> {
    const saltRounds: number = 10;
    const hash = await bcrypt.hash(password, saltRounds)

    .then((hash) => {
        // Store hash in your password DB.
        const updatedUser = this.authRepositories.storeHash(id, hash)
        return updatedUser
    }).catch((err) => {
        console.log("error : ", err);
    });
    
    return hash;

  }
}