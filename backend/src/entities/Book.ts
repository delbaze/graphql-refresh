import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Book {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;
}

export default Book;
