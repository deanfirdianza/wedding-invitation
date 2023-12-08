import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/domain/user/user.schemas';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepositories } from './auth.repositories';
import { UserRepositories } from '../user/user.repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepositories, UserRepositories],
  exports: [AuthService, AuthRepositories]
})
export class AuthModule {}