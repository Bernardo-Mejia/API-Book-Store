import { IResolvers } from "@graphql-tools/utils";
import { IBook } from "../interfaces/book-interface";
import data from "../data";
import { IPeople } from "../interfaces/people-interface";

const mutationResolvers: IResolvers = {
  Mutation: {
    addBook: (
      _: void,
      args: { book: IBook }
    ): { status: boolean; message: string; item: IBook } => {
      //   console.log("---------->", args);
      try {
        const idValue: number = +data.books[data.books.length - 1].id + 1;
        args.book.id = String(idValue);
        (data.books as IBook[]).push(args.book);
        return {
          status: true,
          message: `The book with title ${args.book.title} has been added successfully`,
          item: args.book,
        };
      } catch (error) {
        return {
          status: false,
          message: `An error has occurred: ${error}`,
          item: args.book,
        };
      }
    },
    updateBook: (_: void, args: { id: string }) => {},
    deleteBook: (_: void, args: { id: string }) => {},

    addPeople: (_: void, args: { people: IPeople }): { status: boolean; message: string; item: IPeople } => {
        try {
            const idValue: number = +data.people[data.people.length - 1].id + 1;
            args.people.id = String(idValue);
            (data.people as IPeople[]).push(args.people);
            return {
              status: true,
              message: `The book with title ${args.people.name} has been added successfully`,
              item: args.people,
            };
          } catch (error) {
            return {
              status: false,
              message: `An error has occurred: ${error}`,
              item: args.people,
            };
          }
    },
  },
};

export default mutationResolvers;
