import { IResolvers } from "@graphql-tools/utils";
import { IBook } from "../interfaces/book-interface";
import data from "../data";
import { IPeople } from "../interfaces/people-interface";

const mutationResolvers: IResolvers = {
  Mutation: {
    addBook: (
      _: void,
      args: { book: IBook }
    ): { status: boolean; message: string; item?: IBook } => {
      //   console.log("---------->", args);
      try {
        // ? Validation for name book
        if (
          data.books.filter((value: IBook) => value.title === args.book.title)
            .length > 0
        )
          return {
            status: false,
            message: `This book alredy exists. Please, try another book.`,
          };
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
    updateBook: (
      _: void,
      args: { book: IBook }
    ): { status: boolean; message: string; item?: IBook } => {
      // Validate if the book exists
      if (
        data.books.filter((book: IBook) => book.id === args.book.id).length ===
        0
      )
        return {
          status: false,
          message: `Book with id ${args.book.id} not founded.`,
        };

      if (
        data.books.filter((value: IBook) => value.title === args.book.title)
          .length > 0
      )
        return {
          status: false,
          message: `This name of this book alredy exists. Please, try another name.`,
        };
      // Update book if exists
      for (let i = 0; i < data.books.length; i++) {
        if (data.books[i].id === args.book.id) {
          (data.books[i] as IBook) = args.book;
          break;
        }
      }
      return {
        status: true,
        message: "Update successfully",
        item: args.book,
      };
    },
    deleteBook: (_: void, args: { book: IBook }) => {},

    addPeople: (
      _: void,
      args: { people: IPeople }
    ): { status: boolean; message: string; item: IPeople } => {
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

    updatePeople: (
      _: void,
      args: { people: IPeople }
    ): { status: boolean; message: string; item?: IPeople } => {
        // Validate if the book exists
      if (
        data.people.filter((people: IPeople) => people.id === args.people.id).length ===
        0
      )
        return {
          status: false,
          message: `People with id ${args.people.id} not founded.`,
        };

      // Update people if exists
      for (let i = 0; i < data.people.length; i++) {
        if (data.people[i].id === args.people.id) {
          (data.people[i] as IPeople) = args.people;
          break;
        }
      }
      return {
        status: true,
        message: "Update successfully",
        item: args.people,
      };
    },
  },
};

export default mutationResolvers;
