import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IBook } from "../interfaces/Book-interface";
import { IPeople } from "../interfaces/people-interface";

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
    booksList: (): Array<IBook> => {
      return data.books;
    },
    peopleList: (): Array<IPeople> => {
      return data.people;
    },
  },
};

export default QueryResolver;
