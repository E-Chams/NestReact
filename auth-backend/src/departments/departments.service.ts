import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { Entreprise } from 'src/entreprise/entreprise.entity';
import { EntrepriseService } from 'src/entreprise/entreprise.service';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private departmentsRepository: Repository<Department>,
        @InjectRepository(Entreprise)
        private entrepriseRepository: Repository<Entreprise>,
        private readonly entrepriseService: EntrepriseService
    ) {}
    async findAll(): Promise<Department[]> {
        return this.departmentsRepository.find();
    }
    async findOne(id: number): Promise<Department> {
        const department = await this.departmentsRepository.findOne({ 
            where: { id }, 
            relations: ['entreprise', 'employees'] 
        });
        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async create(name: string, idEntreprise: number): Promise<Department> {
        // Fetch the entreprise using its id
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: (idEntreprise) } });
        
        if (!entreprise) {
            throw new NotFoundException(`Entreprise with ID "${idEntreprise}" not found`);
        }
        
        // Create a new department for the found entreprise
        const department = this.departmentsRepository.create({ name, enterprise: entreprise });
        return this.departmentsRepository.save(department);
    }
    
    
    
    async findByNameAndEntrepriseId(name: string, idEntreprise: number): Promise<Department | null> {
        const department = await this.departmentsRepository.findOne({
            where: { name, enterprise: { id: idEntreprise } },
            relations: ['enterprise']
        });
        return department;
    }

    async findByName(name: string): Promise<Department> {
        const department = await this.departmentsRepository.findOne({ 
            where: { name }, 
            relations: ['enterprise', 'employees'] 
        });
        if (!department) {
            throw new NotFoundException(`Department with name "${name}" not found`);
        }
        return department;
    }

    async remove(name: string): Promise<void> {
        const department = await this.findByName(name);
        await this.departmentsRepository.remove(department);
    }

    async update(id: number, name: string, entrepriseId: number): Promise<Department> {
        const entreprise = await this.entrepriseRepository.findOne({ where: { id: entrepriseId } });
        if (!entreprise) {
            throw new NotFoundException(`Entreprise with ID ${entrepriseId} not found`);
        }
        await this.departmentsRepository.update({ id }, { name, enterprise: entreprise });
        return this.findOne(id);
    }


    
}
