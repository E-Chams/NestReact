import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Entreprise } from 'src/entreprise/entreprise.entity';
import { EntrepriseModule } from 'src/entreprise/entreprise.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department , Entreprise]),
    EntrepriseModule
  ],
  providers: [DepartmentsService],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {}
