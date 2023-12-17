import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialFailedException extends HttpException {
  constructor() {
    super('Incorrect Credentials', HttpStatus.UNAUTHORIZED);
  }
}
