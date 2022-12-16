import { HttpException, HttpStatus, Injectable, Param, ParseIntPipe, Req } from '@nestjs/common';
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
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
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


  async findByEmail(email: string, password: string) {
    const userActive = await this.UserRepo.findOne({
      where: { email: email }
    });
    console.log(userActive)
    if (!userActive) {
      throw new HttpException("ko tìm thấy tài khoản", HttpStatus.UNAUTHORIZED);
    }
    const isMatch  = await bcrypt.compare(password, userActive.password)
    console.log(password, userActive.password)
    if (!isMatch ) {
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

  async vote(itemId: number, userId: number) {
    const item = await this.itemRepository.findOne({
      where: {id: itemId}
    })
    
    const user = await this.UserRepo.findOne({
      where: {id: userId}
    })
    const voteUserId = user.id
    console.log("voteUserId", voteUserId)
    const voteQtt = item.voteQtt += 1;
    console.log("voteQtt", voteQtt)
    
    if (voteQtt < 1) {
      this.itemService.updateVote(voteUserId, itemId);
    } else {
      let fee = 1;
      // lần sau gấp đôi lần trước
      let voteFee = fee * 2^voteQtt;
      let moneyLeft = user.money - voteFee;
      if (user.money < voteFee) {
        console.log("moneyLeft:", moneyLeft)
        return {
          message: 'ko đủ tiền'
        } 
      } else {
        this.UserRepo.update(voteUserId, {
          money: moneyLeft,
        });
        this.itemService.updateVote(voteUserId,itemId);
      }
    }
  }


  async addMoney(id: number,amount: number): Promise<User> {
    const user = await this.UserRepo.findOne({where: {
      id: id
    }})
    console.log("User:", user)
    const userMoney = user.money
    console.log("userMoney:",userMoney)
    
    const money =userMoney + amount
    console.log("Amount:", amount)
    console.log("Money:", money)

    await this.UserRepo.update(id, {
      money : money,
    }) 
    return user
  }
}
