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
    booksList: (): {
      status: boolean;
      message: string;
      list: Array<IBook>;
    } => {
      return {
        status: true,
        message: "Lista de libros cargada correctamente",
        list: data.books,
      };
    },
    peoplesList: (): Array<IPeople> => {
      return data.people;
    },
    book: (
      _: void,
      args: { id: string }
    ): {
      status: boolean;
      message: string;
      item?: IBook;
    } => {
      // return
      const SearchBook: IBook = data.books.filter(
        (value: IBook) => value.id === args.id
      )[0];
      return {
        status: SearchBook !== undefined ? true : false,
        message:
          SearchBook !== undefined
            ? `Book founded with id ${args.id}`
            : `Book not founded with id ${args.id}`,
        item: SearchBook,
      };
    },
    people: (_: void, args: { id: string }): IPeople => {
      return data.people.filter((value: IPeople) => value.id === args.id)[0];
    },
  },
};

export default QueryResolver;
