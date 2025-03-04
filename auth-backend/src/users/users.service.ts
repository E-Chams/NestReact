import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, firstName : string , lastName:string ,password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email,firstName ,lastName, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
