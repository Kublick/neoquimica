import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Employee {
  @ObjectIdColumn()
  _id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  sucursal: string;
  @Column()
  role: string;
  @Column()
  registeredOn: Date;
}
