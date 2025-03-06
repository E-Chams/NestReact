import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from 'src/departments/department.entity';
import { first } from 'rxjs';
import { DepartmentsService } from 'src/departments/departments.service';


@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
        @InjectRepository(Department)
        private departmentsRepository: Repository<Department>,
        
    ) {}
   
    
    async create(employeeBody: Employee): Promise<Employee> {
        const { firstName, lastName, email, phone, password, position, department} = employeeBody;
        

        if (!department) {
            throw new Error('Department ID is required');
        }
    
        // Find the department by ID
        const departmentEntity = await this.departmentsRepository.findOne({where : {id : department.id}})
        
        console.log('department entity',departmentEntity);
        console.log('employeebody.department.id',employeeBody.department.id);
        console.log('Department ID:', department);
    
        if (!departmentEntity) {
            throw new Error('Department not found');
        }
    
        // Create the employee entity
        const employee = new Employee();
        employee.firstName = firstName;
        employee.lastName = lastName;
        employee.email = email;
        employee.phone = phone;
        employee.password = password;
        employee.position = position;
        employee.department = departmentEntity;

        console.log('department id', department.id);
    
        // Save the employee
        return this.employeesRepository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeesRepository.find({relations : ['department']});
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeesRepository.findOne({ where: { id }, relations: [ 'department'] });
        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return employee;
    }

    async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
        await this.employeesRepository.update({ id }, employeeData);
        return this.findOne(id);
    }

    async delete(id: number): Promise <void> {
        await this.employeesRepository.delete({ id });
    }

}
