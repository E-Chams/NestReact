import { Department } from "src/departments/department.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee extends User {
    

    @Column()
    declare phone: string;

    @Column({ nullable: true , default: ''})
    position: string;

   @ManyToOne(() => Department, (department) => department.employees)
   department: Department;
}