import { Body, Controller, Delete, Get, Param, Post, UseFilters } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from 'src/domain/user/user.schemas';
import { GenericExceptionFilter } from 'src/app/utils/filter/generic-exception.filter';
import { UserEmptyException } from './exception/user-empty.exception';

@Controller('users')
// @UseFilters(GenericExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param() params: string): Promise<User|null> {
    return this.userService.findOne(new mongoose.Types.ObjectId(params));
  }

  @Delete(':id')
  deleteOneUser(@Param() params: string): Promise<any> {
    return this.userService.delete(new mongoose.Types.ObjectId(params));
  }
}
