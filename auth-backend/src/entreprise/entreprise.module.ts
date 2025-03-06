import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entreprise } from './entreprise.entity';
import { EntrepriseController } from './entreprise.controller';
import { EntrepriseService } from './entreprise.service';

@Module({
    imports: [TypeOrmModule.forFeature([Entreprise])], // Register the repository
    controllers: [EntrepriseController],
    providers: [EntrepriseService],
    exports: [EntrepriseService],
  })
export class EntrepriseModule {}
