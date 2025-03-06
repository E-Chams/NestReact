import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from 'src/departments/department.entity';
import { first } from 'rxjs';
import { DepartmentsService } from 'src/departments/departments.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';


@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
        @InjectRepository(Department)
        private departmentsRepository: Repository<Department>,
        private usersService: UsersService,
    
    ) {}
   
    /*
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
    }*/
        async create(employeeData: Partial<Employee>): Promise<Employee> {
            const { department, ...restEmployeeData } = employeeData;
        
            // Validate department
            if (!department || !department.id) {
                throw new NotFoundException('Department information is required with a valid id');
            }
            const existingDepartment = await this.departmentsRepository.findOne({ where: { id: department.id } });
            if (!existingDepartment) {
                throw new NotFoundException(`Department with ID ${department.id} not found`);
            }
        
            // Create Employee entity
            const newEmployee = this.employeesRepository.create({
                ...restEmployeeData,
                department: existingDepartment,
            });
        
            // Create associated User (parent of Employee) and save it in the same table
            const user = new User();
            user.email = newEmployee.email;
            user.password = newEmployee.password;
            user.firstName = newEmployee.firstName;
            user.lastName = newEmployee.lastName;
            // Here you can add any other common fields for User
            await this.usersService.create(user);  // Ensure this creates the User in the 'user' table
        
            // Save the employee (which will save the User fields automatically due to STI)
            const savedEmployee = await this.employeesRepository.save(newEmployee);
        
            return savedEmployee;
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
