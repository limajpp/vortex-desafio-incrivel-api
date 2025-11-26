import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense } from './expenses.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[]

  @AfterInsert()
  logInsert() {
    console.log(`User ${this.name} has been ceated!`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User ${this.name} has been removed!`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User ${this.name} has been updated!`);
  }
}
