import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './app/modules/user/user.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './app/utils/middleware/auth.middleware';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/wedding-invitation'),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).
    exclude(
      { path: 'auth/(.*)', method: RequestMethod.POST }
    ).
    forRoutes('*');
  }
}
