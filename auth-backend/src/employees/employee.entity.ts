import { Department } from "src/departments/department.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee extends User {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column({ unique: true })
    declare email: string;

    @Column({ nullable: true, default: '' })  
    declare firstName: string;

    @Column({ nullable: true, default: '' })  
    declare lastName: string;
    
    @Column({ nullable: true, default: '' })  
    phone: string;

    @Column()
    declare password: string;

    @Column({ nullable: true , default: ''})
    position: string;



   @ManyToOne(() => Department, (department) => department.employees)
   //departmentId : number;
   department: Department;
}