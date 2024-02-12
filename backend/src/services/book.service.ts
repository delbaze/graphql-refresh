import { Repository } from "typeorm";
import Book, { AddBookInput, UpdateBookInput } from "../entities/Book";
import datasource from "../lib/datasource";

export default class BookService {
  db: Repository<Book>;
  constructor() {
    this.db = datasource.getRepository("Book");
  }

  async listBooks() {
    return await this.db.find();
  }

  async findBookByTitle(title: string) {
    const book = await this.db.findOneBy({ title });
    if (!book) {
      throw new Error("Le livre n'existe pas");
    }
    return book;
    // return await this.db.findOne({ where: { title } });
  }

  async addBook({ title, author }: AddBookInput) {
    const book = this.db.create({ title, author });
    return await this.db.save(book);
    // return await this.db.save({title, author})
  }

  async findBookById(id: string) {
    const book = await this.db.findOneBy({ id });
    if (!book) {
      throw new Error("Le livre n'existe pas");
    }
    return book;
  }
  async deleteBook(id: string) {
    const book = await this.findBookById(id);

    await this.db.delete(book);
    return book;
  }

  async updateBook({ id, author, title }: UpdateBookInput) {
    const book = await this.findBookById(id);
    return await this.db.save(this.db.merge(book, { author, title }));
  }
}
