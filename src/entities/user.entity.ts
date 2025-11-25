import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
