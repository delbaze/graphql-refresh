import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import datasource from "./lib/datasource";
import { buildSchema } from "type-graphql";
import BookResolver from "./resolvers/book.resolver";


async function main() {
  const schema = await buildSchema({
    resolvers: [BookResolver],
  });
  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema
  });
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
