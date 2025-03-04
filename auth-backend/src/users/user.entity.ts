import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  password: string;
}
