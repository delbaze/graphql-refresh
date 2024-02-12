import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

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
    addBook(infos: AddBookInput): [Book]
  }
`;

const resolvers = {
  Query: {
    books: (): Book[] => books,
    findBookByTitle: (_: null, { title }: FindBookArgs) => {
      const book = books.find((b) => b.title === title);
      if (!book) {
        throw new Error("Le livre n'existe pas");
      }
      return book;
    }, //UMD
  },
  Mutation: {
    addBook: (_: null, { infos }: AddBookArgs) => {
      console.log("INFOS", infos);
      books.push(infos);
      return books;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
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
