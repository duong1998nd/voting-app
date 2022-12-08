import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/module/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
              }]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate({email}) {
        const user = await this.authService.validateUser(email)
        if(!user){
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        }
        return user;
    }

    // async validate(payload: TokenPayload) {
    //     return this.userService.getById(payload.userId);
    //   }
}