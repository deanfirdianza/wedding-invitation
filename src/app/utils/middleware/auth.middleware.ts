import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { CredentialFailedException } from 'src/app/modules/auth/exception/credential-failed.exception';
import { UnauthorizedException } from 'src/app/modules/auth/exception/unauthorize.exception';
import { COMMON } from 'src/app/shared/const/common.const';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService:JwtService){}
  
    use(req: Request, res: Response, next: NextFunction) {

        const jwtCookies = req.cookies[COMMON.JWT_NAME];
        if (!jwtCookies) {
            throw new UnauthorizedException()
        }

        
        let result = this.jwtService.verify(jwtCookies, { secret: process.env.JWT_SECRET_KEY })
        if (!result) {
            throw new CredentialFailedException()
        }
        next();
    }
}
