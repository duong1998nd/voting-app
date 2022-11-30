import { AppService } from './app.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { AuthService } from './auth/auth.service';
import { createUserDto } from './module/user/dto/createUser.dto';
import { UserService } from './module/user/user.service';
export declare class AppController {
    private readonly appService;
    private authService;
    private userService;
    constructor(appService: AppService, authService: AuthService, userService: UserService);
    rootsss(): {
        message: string;
    };
    login(loginAdminDto: AuthLoginDto): Promise<any>;
    createAdmin(userCreate: createUserDto): Promise<{
        image: string;
        name: string;
        email: string;
        password: string;
    } & import("./module/user/entity/user.entity").User>;
}
