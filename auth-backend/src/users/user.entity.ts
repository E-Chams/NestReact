import { Employee } from 'src/employees/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: '' })  
  firstName: string;

  @Column({ nullable: true, default: '' })  
  lastName: string;

  @Column({ default: 'user' }) 
  role: string;

  @Column()
  password: string;

/*
  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;
  */
}
