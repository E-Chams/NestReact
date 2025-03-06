import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
async create(userData: Partial<User>): Promise<User> {
  if (!userData.password) {
    throw new Error('Password is required');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password
  const newUser = this.userRepository.create({
    ...userData,
    password: hashedPassword, // Use the hashed password
  });
  return this.userRepository.save(newUser);
}

  // Find a user by ID
  async findOne(id: number): Promise<User| null>  {
  return this.userRepository.findOne({ where: { id } });
}

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find a user by email (optional, for login or email-based queries)
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}