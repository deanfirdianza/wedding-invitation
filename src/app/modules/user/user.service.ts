import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/domain/user/user.schemas';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepositories } from './user.repositories';
import { GenericExceptionFilter } from 'src/app/utils/filter/generic-exception.filter';
import { UserEmptyException } from './exception/user-empty.exception';
import { AuthService } from '../auth/auth.service';

@Injectable()
@UseFilters(GenericExceptionFilter)
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userRepositories: UserRepositories,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    let userObj = await this.userRepositories.create(createUserDto)

    const hashedPassword = await this.authService.hashPassword(userObj._id, createUserDto.password)
    console.log("hashedPassword : ", hashedPassword);
    console.log(createUserDto);
    
    return userObj;
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<FilterQuery<UserDocument>> {

    let userObj = await this.userRepositories.update(id, updateUserDto)

    return userObj;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepositories.findAll()
  }

  async findOne(id: Types.ObjectId): Promise<User|null> {
    const userObject = await this.userRepositories.findOne(id)
    if (userObject == null) {
      throw new UserEmptyException();
    }
    
    return userObject
  }

  async delete(id: Types.ObjectId): Promise<any> {
    return await this.userRepositories.delete(id);
  }
}