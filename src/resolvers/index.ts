import typesResolver from "./types";
import QueryResolver from "./query";
import mutationResolvers from "./mutation";

const resolverindex = {
  ...QueryResolver,
  ...typesResolver,
  ...mutationResolvers,
};

export default resolverindex;
