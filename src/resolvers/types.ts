import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IBook } from "../interfaces/book-interface";
import { IPeople } from "../interfaces/people-interface";
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
  People: {
    booksBuy: (root: { books: Array<string> }) => {
      // console.log("<===========root===========>", root.books);
      return data.books.filter(
        (book: IBook) => root.books.indexOf(book.id) > -1
      );
    },
  },
  Book: {
    byPeopleBuy: (root: { id: string }) => {
      return data.people.filter(
        (people: IPeople) => people.books.indexOf(root.id) > -1
      );
    },
  },
};

export default typesResolver;
