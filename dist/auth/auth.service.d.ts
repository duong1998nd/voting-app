import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/module/user/dto/createUser.dto';
import { User } from 'src/module/user/entity/user.entity';
import { UserService } from 'src/module/user/user.service';
import { AuthLoginDto } from "./auth-login.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(userDto: createUserDto): Promise<any>;
    login(user: AuthLoginDto): Promise<any>;
    validateAccount(email: any): Promise<User>;
    private _createToken;
}
