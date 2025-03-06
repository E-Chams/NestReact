import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { EntrepriseModule } from './entreprise/entreprise.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'auth_db',
      autoLoadEntities: true,
      migrations: ['dist/migrations/*.ts'],
      synchronize: true, 
    }),
    forwardRef(()=>UsersModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>EmployeesModule),
    forwardRef(()=>DepartmentsModule),
    forwardRef(() =>EntrepriseModule),
  ],
})
export class AppModule {}

