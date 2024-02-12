import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import datasource from "./lib/datasource";
import BookService from "./services/book.service";

type Book = {
  title: string;
  author: string;
};

type FindBookArgs = {
  title: string;
};

type AddBookArgs = { infos: { title: string; author: string } };

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql
  type Book {
    id: String
    title: String
    author: String
  }

  input AddBookInput {
    title: String
    author: String
  }

  type Query {  
    books: [Book]
    findBookByTitle(title: String): Book
  }

  type Mutation {
    addBook(infos: AddBookInput): Book
  }
`;

const resolvers = {
  Query: {
    books: async (): Promise<Book[]> => {
      const listBooks = await new BookService().listBooks();
      return listBooks;
    },
    findBookByTitle: async (_: null, { title }: FindBookArgs) => {
      const book = await new BookService().findBookByTitle(title);
      return book;
    }, //UMD
  },
  Mutation: {
    addBook: async (_: null, { infos }: AddBookArgs) => {
      const bookCreated = await new BookService().addBook(infos);
      return bookCreated;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  await datasource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4006 },
    // context: ({req, res}) => {

    //     //logique de code
    //  return {}
    // }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
