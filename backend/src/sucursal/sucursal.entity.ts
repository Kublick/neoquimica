import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Sucursal {
  @ObjectIdColumn()
  _id: string;
  @Column({ unique: true })
  name: string;
}
