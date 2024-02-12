import { Repository } from "typeorm";
import Book from "../entities/Book";
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

  async addBook({ title, author }: Omit<Book, "id">) {
    const book = this.db.create({ title, author });
    return await this.db.save(book);
    // return await this.db.save({title, author})
  }
}
