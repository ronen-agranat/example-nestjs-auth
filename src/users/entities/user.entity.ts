import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  // Do not share hashed password!
  @Column({ length: 500 })
  hashedPassword: string;

  // Do not share refresh token!
  @Column({ nullable: true })
  public currentHashedRefreshToken?: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  isAdmin = false;

  @CreateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}
