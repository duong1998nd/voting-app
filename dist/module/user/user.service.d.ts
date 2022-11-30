import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { createUserDto } from './dto/createUser.dto';
import { AuthLoginDto } from 'src/auth/auth-login.dto';
export declare type User_infor = {
    id: string;
    name: string;
    password: string;
    email: string;
};
export declare class UserService {
    private readonly UserRepo;
    [x: string]: any;
    constructor(UserRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User[]>;
    findLogin({ email, password }: AuthLoginDto): Promise<User>;
    findOneByEmail(email: string): Promise<User_infor | undefined>;
    create(data: createUserDto): Promise<{
        image: string;
        name: string;
        email: string;
        password: string;
    } & User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    update(id: number, userUpdateDto: updateUserDto): Promise<import("typeorm").UpdateResult>;
    login(Dto: loginUserDto): Promise<User>;
}
