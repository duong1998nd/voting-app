import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/createUser.dto';
import { AuthLoginDto } from 'src/auth/auth-login.dto';

export type User_infor = {
  id: string,
  name: string,
  password: string,
  email: string
};
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}
  
  async findAll(): Promise<User[]> {
    return await this.UserRepo.find();
  }
  
  async findOneById(id: string): Promise<User[]> {
    return await this.UserRepo.findBy({id:+id});
  }

  async getUserById(id: any): Promise<User> {
    const User = await this.UserRepo.findOne({ where: { id: id } });
    delete User.password;
    return User;
  }


  async findByEmail({email, password}: AuthLoginDto){
    const userActive = await this.UserRepo.findOne({
        where: { email: email}
    });

    if(!userActive){
      throw new HttpException("ko tìm thấy tài khoản", HttpStatus.UNAUTHORIZED);
    }
    const compare_pass = await bcrypt.compare(password,userActive.password)
    if(!compare_pass){
      throw new HttpException("Đăng nhập thất bại", HttpStatus.UNAUTHORIZED);
    }
    return userActive;
  }

  // async findOneByEmail(email: string): Promise<User_infor | undefined> {
  //   return (await this.users).find(user => user.email === email);
  // }


  async create(data: createUserDto){
    data.password =  await bcrypt.hash(data.password, 10);
    try {
      console.log({...data});    
      const user_bcrypt = await this.UserRepo.save({...data});
      delete user_bcrypt.password;
      console.log(user_bcrypt);
      return user_bcrypt;
    } catch (error) {
      console.log(error);
      
      throw new Error('Nhập đẩy đủ thông tin');
    }
  }

  remove(id: number){
    return this.UserRepo.delete(id)
  }

  async update(id: number, userUpdateDto:updateUserDto){
    return await this.UserRepo.update(+id, userUpdateDto);
  }

  async login(Dto: loginUserDto){
    const user = await this.UserRepo.findOne({
      where : {
        email: Dto.email,
      }
    });
    if(!user){
      throw new Error(`thông tin tài khoản không chính xác`);
    }

    const pw = await bcrypt.compare(Dto.password, user.password);
    if(!pw){
      throw new Error('thông tin tài khoản không chính xác')
    }    

    delete user.password;
    return user;
  }
}
