/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  EntityManager,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class AllUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  usertype: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  mobile: string;
  @Column()
  image_url: string;
  @Column({ unique: true })
  email: string;
  @Column()
  gender: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @Column()
  accountBalance: number = 0;
  roles: any;

  @BeforeInsert()
  async HashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
