import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { Server, createServer } from "http";

class GraphQLServer {
  // ? Propiedades
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT = 3025;
  constructor() {
    this.init();
  }

  private init() {
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }

  private configExpress() {
    this.app = express();
    this.app.use(compression());
    this.httpServer = createServer(this.app);
  }

  private async configApolloServerExpress() {
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
    apolloServer.applyMiddleware({ app: this.app, cors: true });
  }

  private configRoutes() {
    this.app.get("/hello", (_, res) => {
      res.send("Sé bienvenido");
    });

    this.app.get("/", (_, res) => {
      res.redirect("/graphql");
    });
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}

export default GraphQLServer;
