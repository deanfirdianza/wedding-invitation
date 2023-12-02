import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './app/modules/user/user.module';
import { UsersService } from './app/modules/user/user.service';
import { User, UserSchema } from './domain/user/user.schemas';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/wedding-invitation'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // UsersModule
  ],
  controllers: [AppController],
  providers: [
    UsersService,
  ],
})
export class AppModule {}
