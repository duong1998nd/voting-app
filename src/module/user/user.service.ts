import { HttpException, HttpStatus, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/createUser.dto';
import { AuthLoginDto } from 'src/auth/auth-login.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Item } from '../items/entities/item.entity';
import { ItemService } from '../items/items.service';
import { VoteService } from '../vote/vote.service';

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
    private readonly itemService: ItemService,
  ) { }

  // async getId(){
  //   return this.id;
  // }
  async findAll(): Promise<User[]> {
    return await this.UserRepo.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.UserRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // orderBy name 

    return paginate<User>(queryBuilder, options);
  }

  
  async findOneById(id: string): Promise<User[]> {
    return await this.UserRepo.findBy({ id: +id });
  }

  async findById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<User[]> {
    return await this.UserRepo.findBy({ id: +id });
  }

  async getUserById(id: number): Promise<User> {
    const User = await this.UserRepo.findOne({ where: { id: id } });
    if (User) {
      delete User.password;
      return User;
    }
    throw new HttpException('Không tồn tại người dùng này', HttpStatus.NOT_FOUND)
  }


  async findByEmail({ email, password }: AuthLoginDto) {
    const userActive = await this.UserRepo.findOne({
      where: { email: email }
    });

    if (!userActive) {
      throw new HttpException("ko tìm thấy tài khoản", HttpStatus.UNAUTHORIZED);
    }
    const compare_pass = await bcrypt.compare(password, userActive.password)
    if (!compare_pass) {
      throw new HttpException("Đăng nhập thất bại", HttpStatus.UNAUTHORIZED);
    }
    return userActive;
  }

  async findEmail(email: string): Promise<User> {
    return await this.UserRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  // async findOneByEmail(email: string): Promise<User_infor | undefined> {
  //   return (await this.users).find(user => user.email === email);
  // }


  async create(data: createUserDto) {
    data.password = await bcrypt.hash(data.password, 10);
    try {
      console.log({ ...data });
      const user_bcrypt = await this.UserRepo.save({ ...data });
      delete user_bcrypt.password;
      console.log(user_bcrypt);
      return user_bcrypt;
    } catch (error) {
      console.log(error);

      throw new Error('Nhập đẩy đủ thông tin');
    }
  }

  remove(id: number) {
    return this.UserRepo.delete(id)
  }

  async update(id: number, userUpdateDto: updateUserDto) {
    return await this.UserRepo.update(+id, userUpdateDto);
  }

  async login(Dto: loginUserDto) {
    const user = await this.UserRepo.findOne({
      where: {
        email: Dto.email,
      }
    });
    if (!user) {
      throw new Error(`thông tin tài khoản không chính xác`);
    }

    const password = await bcrypt.compare(Dto.password, user.password);
    if (!password) {
      throw new Error('thông tin tài khoản không chính xác')
    }

    delete user.password;
    return user;
  }

  vote(voteQtt: number, itemId, getUser) {
    if (voteQtt < 1) {
      this.itemService.updateVote(voteQtt, itemId);
    } else {
      let fee = 1;
      // lần sau gấp đôi lần trước
      let voteFee = fee * 2^voteQtt;
      console.log(getUser.money)
      let moneyLeft = getUser.money - voteFee;
      if (getUser.money < voteFee) {
        return {
          message: 'ko đủ tiền'
        }
      } else {
        this.UserRepo.update(getUser.id, {
          money: moneyLeft,
        });
        this.itemService.updateVote(voteQtt, itemId);
        // this.voteService.createHistoryVote(getUser.id, itemId, voteQtt)
      }
    }


  }
}
