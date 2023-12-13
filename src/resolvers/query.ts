import { IResolvers } from "@graphql-tools/utils";

const QueryResolver: IResolvers = {
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

export default QueryResolver;
