import { IResolvers } from "@graphql-tools/utils";
const typesResolver: IResolvers = {
  Data: {
    __resolveType(obj: { name: string; isbn: string }) {
      // Only People has a name field
      if (obj.name) {
        return "People";
      }
      // Only Book has a title field
      if (obj.isbn) {
        return "Book";
      }
      return null; // GraphQLError is thrown
    },
  },
};

export default typesResolver;
