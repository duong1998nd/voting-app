import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/module/user/dto/createUser.dto';
import { User } from 'src/module/user/entity/user.entity';
import { UserService } from 'src/module/user/user.service';
import { AuthLoginDto } from "./auth-login.dto";



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    async register (userDto: createUserDto){
        const user = await this.userService.create(userDto);
        const token = this._createToken(user);
        return {
            email:user.email,
            ...token,
        }
    }

    async login(user: AuthLoginDto){
        const account = await this.userService.findByEmail(user);
        const token = this._createToken(account)
        return {
            email: user.email,
            ...token
        }
    }
    async validateAccount(email): Promise<User>{
        const account = await this.userService.findByEmail(email);
        if (!account){
            throw new HttpException('Email không đúng',HttpStatus.UNAUTHORIZED);
        }
        return account;
    }

    private _createToken({email}):any {
        const accesstoken = this.jwtService.sign({email})
        return {
            accesstoken
        };
    }

 }