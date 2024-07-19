import { MaxLength, IsInt, IsEmail } from "class-validator";
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
  id?: string;

  @MaxLength(100)
  @Column("varchar", { length: 100 })
  firstName: string;

  @MaxLength(100)
  @Column("varchar", { length: 100 })
  lastName: string;

  @IsInt()
  @Column("integer")
  age: number;

  @IsEmail()
  @Column()
  email: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;
}
