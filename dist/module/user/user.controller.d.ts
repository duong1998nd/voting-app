/// <reference types="multer" />
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { createUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("./entity/user.entity").User[]>;
    rootsss(): {
        message: string;
    };
    findOne(id: string): Promise<import("./entity/user.entity").User[]>;
    create(createUserDto: createUserDto, file: Express.Multer.File): Promise<{
        image: string;
        name: string;
        email: string;
        password: string;
    } & import("./entity/user.entity").User>;
    register(UserCreate: createUserDto): Promise<{
        image: string;
        name: string;
        email: string;
        password: string;
    } & import("./entity/user.entity").User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    updateUser(id: number, updateUserDto: updateUserDto): Promise<import("typeorm").UpdateResult>;
    login(info: loginUserDto): Promise<import("./entity/user.entity").User>;
}
