import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity'
import { Employee } from '../employees/employee.entity';
import { Department } from '../departments/department.entity';
import { Entreprise } from '../entreprise/entreprise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Employee,Department,Entreprise])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
