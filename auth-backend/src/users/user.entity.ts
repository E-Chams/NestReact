import { Employee } from 'src/employees/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column,  TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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


}
