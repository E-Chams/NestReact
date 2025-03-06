import { Employee } from "src/employees/employee.entity";
import { Entreprise } from "src/entreprise/entreprise.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[];

    @ManyToOne(() => Entreprise, (entreprise) => entreprise.departments)
    enterprise: Entreprise;
    
}