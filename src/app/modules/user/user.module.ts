import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/domain/user/user.schemas';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositories } from './user.repositories';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepositories, AuthService],
})
export class UserModule {}