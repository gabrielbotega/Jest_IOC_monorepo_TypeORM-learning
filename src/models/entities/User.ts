import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column("varchar", { length: 100 })
  firstName: string;

  @Column("varchar", { length: 100 })
  lastName: string;

  @Column("integer")
  age: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
