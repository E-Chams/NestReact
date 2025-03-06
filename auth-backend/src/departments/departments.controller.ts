import { Controller, Get  , Param , Post, Body , Put , Delete, Query} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';

@Controller('departments')
export class DepartmentsController {
    constructor( private readonly departmentsService : DepartmentsService)  {}
    

  
    @Get()
    async findAll(){
        return this.departmentsService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.departmentsService.findOne(id);
    }
    @Post()
    async create(@Body('name') name: string, @Body('idEntreprise') idEntreprise: number): Promise<Department> {
        const existingDepartment = await this.departmentsService.findByNameAndEntrepriseId(name, idEntreprise);
        if (existingDepartment) {
            throw new Error('Department name already exists for this entreprise');
        }
        return this.departmentsService.create(name, idEntreprise);
    }

    @Put(':id')
    async update(
        @Param('id') id: number, 
        @Body('name') name: string, 
        @Body('entrepriseId') entrepriseId: number
    ): Promise<Department> {
        return this.departmentsService.update(id, name, entrepriseId);
    }

    @Delete(':id')
    async remove(@Param('name') name: string): Promise<void> {
        return this.departmentsService.remove(name);
    }
}
