import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/domain/user/user.schemas';
import { UsersService } from './user.service';
import { Model } from 'mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [],
  providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}