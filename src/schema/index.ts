import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";
import resolvers from "./../resolvers";
// ? construir el esquema ejecutable
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


export default schema;