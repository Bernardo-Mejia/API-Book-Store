import express, { Application } from "express";
import compression from "compression";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import { createServer } from "http";

async function start() {
  //   const app = express();
  const app = express();

  app.use(compression());

  // ? Definir los tipos de definicion
  const typeDefs = gql`
    type Query {
      hello: String!
      helloWithName(name: String!): String!
      peopleNumber: Int!
    }
  `;

  // Resolvers
  const resolver = {
    Query: {
      hello: (): string => "Hola",
      helloWithName: (
        _: void,
        args: { name: string },
        context: any,
        info: object
      ) => {
        console.log(info);
        return `Hola, ${args.name}`;
      },
      peopleNumber: () => 703,
    },
  };

  // ? construir el esquema ejecutable
  const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers: resolver,
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
  });

  await apolloServer.start();

  // ? Configuración del servidor de Apollo Server
  apolloServer.applyMiddleware({ app, cors: true });

  app.use("/hello", (_, res) => {
    res.send("Sé bienvenido");
  });

  app.get("/", (_, res) => {
    res.redirect("/graphql");
  });

  const httpServer = createServer(app);

  httpServer.listen(
    {
      port: 3025,
    },
    () => console.log("Server running: http://localhost:3025")
  );
}

start()