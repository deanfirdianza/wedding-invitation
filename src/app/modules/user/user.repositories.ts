import { Injectable} from '@nestjs/common';
import { Document, FilterQuery, Model, ModifyResult, Types, UpdateWriteOpResult } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from 'src/domain/user/user.schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepositories {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<FilterQuery<UserDocument>> {
    const createdUser = await this.userModel.updateOne({ _id: id }, {name: updateUserDto?.name, email: updateUserDto?.email}).exec();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<User|null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findByUsername(username: string): Promise<UserDocument|null> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async delete(id: Types.ObjectId): Promise<ModifyResult<Document>> {
    const deletedUser = await this.userModel.findByIdAndDelete({ _id: id }).exec();
    return deletedUser;
  }
}
