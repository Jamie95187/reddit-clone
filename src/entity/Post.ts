import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({ type: "date" })
  createdAt: Date = new Date();

  @Column({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Column({ type: "text" })
  title!: string;

}
