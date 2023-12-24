import QueryResolver from "./query";
import typesResolver from "./types";

const resolverindex = {
    ...QueryResolver,
    ...typesResolver
}

export default resolverindex;