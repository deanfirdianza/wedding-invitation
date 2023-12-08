// src/exceptions/user-empty.exception.ts

import { HttpException } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(error: Error, httpStatus: number) {
    super(error.message, httpStatus);
  }
}
