import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class Book {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  author: string;
}

@InputType()
export class AddBookInput {
    @Field()
    title: string

    @Field()
    author: string

}

@InputType()
export class UpdateBookInput {
    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    author?: string

    @Field()
    id: string
}

export default Book;
