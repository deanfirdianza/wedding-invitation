import * as dotenv from 'dotenv';
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './app/utils/interceptor/response.interceptor';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './app/utils/middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());  
  await app.listen(3000);
}
bootstrap();
