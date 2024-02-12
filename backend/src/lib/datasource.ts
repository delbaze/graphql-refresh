import { DataSource } from "typeorm";

export default new DataSource({
    type: "sqlite",
    database: "book.sqlite",
    entities: [],
    synchronize: true,
    logging: ["error", "query"]
})