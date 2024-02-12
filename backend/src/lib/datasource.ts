import { DataSource } from "typeorm";
import Book from "../entities/Book";

export default new DataSource({
    type: "sqlite",
    database: "book.sqlite",
    entities: [Book],
    synchronize: true,
    logging: ["error", "query"]
})