import GraphQLServer from "./server";

const grapgQLServer = new GraphQLServer();
grapgQLServer.listen((port: number) => {
  console.log(`http://localhost:${port}/graphql`);
});
