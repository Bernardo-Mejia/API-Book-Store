import GraphQLServer from "./server";
import schema from "./schema";

const grapgQLServer = new GraphQLServer(schema);
grapgQLServer.listen((port: number) => {
  console.log(`http://localhost:${port}/graphql`);
});
