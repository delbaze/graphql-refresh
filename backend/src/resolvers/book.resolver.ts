import { Arg, Mutation, Query, Resolver } from "type-graphql";
import BookService from "../services/book.service";
import Book, { AddBookInput, UpdateBookInput } from "../entities/Book";

@Resolver()
export default class BookResolver {
  @Query(() => [Book])
  async books() {
    const listBooks = await new BookService().listBooks();
    return listBooks;
  }

  @Query(() => Book)
  async findBookByTitle(@Arg("title") title: string) {
    const book = await new BookService().findBookByTitle(title);
    return book;
  }

  @Mutation(() => Book)
  async addBook(@Arg("infos") infos: AddBookInput) {
    const bookCreated = await new BookService().addBook(infos);
    return bookCreated;
  }

  @Mutation(() => Book)
  async deleteBook(@Arg("id") id: string): Promise<Book> {
    const bookDeleted = await new BookService().deleteBook(id);
    return bookDeleted;
  }

  @Mutation(() => Book)
  async updateBook(@Arg("infos") infos: UpdateBookInput){
    const bookUpdated = await new BookService().updateBook(infos);
    return bookUpdated;
  }
}
