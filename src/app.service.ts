import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMongoDB(): string {
    return 'Hello World!';
  }

  setMongoDB(): string {
    return 'Hello World!';
  }
}
