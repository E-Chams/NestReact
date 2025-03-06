import { Controller, UseGuards , Post , Get , Delete , Body , Param , Put} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Employee } from './employee.entity';


@Controller('employees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Post()
  //@Roles('user')
  async create(@Body() employeeData: Employee): Promise<Employee> {
    return this.employeesService.create(employeeData);
  }

  @Get()
  //@Roles('user')
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  //@Roles('admin')
  async update(@Param('id') id: number, @Body() employeeData: Partial<Employee>): Promise<Employee> {
    return this.employeesService.update(id, employeeData);
  }

  @Delete(':id')
  //@Roles('admin')
  async delete(@Param('id') id: number): Promise<void> {
    return this.employeesService.delete(id);
  }



}
