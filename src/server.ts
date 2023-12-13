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
  private schema!: GraphQLSchema;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error("It required a GraphQL Schema to work with GraphQL APIs");
    }
    this.schema = schema;
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
    const apolloServer = new ApolloServer({
      schema: this.schema,
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
