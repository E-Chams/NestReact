import { Controller, Get, NotFoundException, Param , Post , Body} from '@nestjs/common';
import { Entreprise } from './entreprise.entity';
import { EntrepriseService } from './entreprise.service';


@Controller('entreprise')
export class EntrepriseController {
    constructor(private readonly entrepriseService: EntrepriseService) {}

    @Post()
    async create(@Body('name') name: string): Promise<Entreprise> {
        return this.entrepriseService.create(name);
    }

    @Get()
  async findAll(): Promise<Entreprise[]> {
    return this.entrepriseService.findAll();
  }

  // Get a single Entreprise by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Entreprise> {
    const entreprise = await this.entrepriseService.findOne(id);
    if (!entreprise) {
      throw new NotFoundException(`Entreprise with ID ${id} not found`);
    }
    return entreprise;
  }
}
