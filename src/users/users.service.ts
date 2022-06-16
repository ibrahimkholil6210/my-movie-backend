import {Model} from 'mongoose'
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try{
        let createUser = new this.userModel(createUserDto);
        return await createUser.save();
    }catch(err){
        console.log(err)
        throw new HttpException('User already exists', 409);
    }
  }
}
