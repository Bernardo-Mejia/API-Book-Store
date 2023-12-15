import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IBook } from "../interfaces/book-interface";
import { IPeople } from "../interfaces/people-interface";
import { validate } from "graphql";

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
    peoplesList: (): Array<IPeople> => {
      return data.people;
    },
    book: (_: void, args: { id: string }) => {
      return data.books.filter((value: IBook) => value.id === args.id)[0];
    },
    people: (_: void, args: { id: string }) => {
      return data.people.filter((value: IPeople) => value.id === args.id)[0];
    },
  },
};

export default QueryResolver;
