// src/exceptions/user-empty.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEmptyException extends HttpException {
  constructor() {
    super('User is empty', HttpStatus.BAD_REQUEST);
  }
}
