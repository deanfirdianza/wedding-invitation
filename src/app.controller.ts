import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './app/modules/user/user.service';
import { CreateUserDto } from './app/modules/user/dto/user.dto';
import { User } from './domain/user/user.schemas';
import mongoose from 'mongoose';

@Controller('users')
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly userService: UsersService,
    ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
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
}
