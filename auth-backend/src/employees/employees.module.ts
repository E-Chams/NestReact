import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Department } from 'src/departments/department.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee , Department , User
    ]), // Register the Employee entity
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, UsersService ],
  exports: [EmployeesService ],
})
export class EmployeesModule {}
