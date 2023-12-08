import { Body, Controller, Delete, Get, Param, Post, UseFilters } from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from 'src/domain/user/user.schemas';
import { GenericExceptionFilter } from 'src/app/utils/filter/generic-exception.filter';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CredentialFailedException } from './exception/credential-failed.exception';


@Controller('auth')
@UseFilters(GenericExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginDto) {
    let result = await this.authService.login(loginUserDto.username, loginUserDto.password);
    if (result == false) {
      throw new CredentialFailedException();
    }
    return result
  }

  @Post('logout')
  logoutUser() {
    this.authService.logout();
    return "logout";
  }
}
