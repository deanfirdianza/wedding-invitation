// src/exceptions/user-empty.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.BAD_REQUEST);
  }
}
