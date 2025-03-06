import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entreprise } from './entreprise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntrepriseService {

constructor(
    @InjectRepository(Entreprise)
    private entrepriseRepository: Repository<Entreprise>,
  ) {}

  async create(name: string): Promise<Entreprise> {
    const entreprise = this.entrepriseRepository.create({ name });
    return this.entrepriseRepository.save(entreprise);
}

    async findAll(): Promise<Entreprise[]> {    
        return this.entrepriseRepository.find();
    }   
    
    async findOne(id: number): Promise<Entreprise> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id } });
        if (!entreprise) {
            throw new Error(`Entreprise with id ${id} not found`);
        }
        return entreprise;
    }
    async findByName(name: string): Promise<Entreprise> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { name } });
        if (!entreprise) {
            throw new Error(`Entreprise with name "${name}" not found`);
        }
        return entreprise;
    }
}
