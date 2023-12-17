import { Body, Controller, Delete, Get, Param, Post, Res, UnauthorizedException, UseFilters } from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from 'src/domain/user/user.schemas';
import { GenericExceptionFilter } from 'src/app/utils/filter/generic-exception.filter';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CredentialFailedException } from './exception/credential-failed.exception';
import { UserService } from '../user/user.service';
import * as Cookie from 'cookie';
import { Response } from 'express';
import { GLOBAL_STATUS } from 'src/app/shared/const/status.const';
import { COMMON } from 'src/app/shared/const/common.const';

@Controller('auth')
@UseFilters(GenericExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async signInUser(@Body() loginUserDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    let isUserValid = await this.authService.verifyCredential(loginUserDto.username, loginUserDto.password);

    if (!isUserValid) {
      throw new UnauthorizedException();
    } 
    const accessToken = await this.authService.createAccessToken(loginUserDto.username)

    response.cookie(COMMON.JWT_NAME, accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict', // Adjust as needed, 
      maxAge: 1*8*60*60*1000, //dd*hh*mm*ss*ms
    });

    return GLOBAL_STATUS.SUCCESS ; // Optionally, you can still return the access token in the response body
  }


  @Post('logout')
  signOutUser(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(COMMON.JWT_NAME)
    return GLOBAL_STATUS.SUCCESS;
  }
}
