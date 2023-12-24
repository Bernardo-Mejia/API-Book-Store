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
    github: (root: { github: string }) =>
      root.github === undefined ? null : `https://github.com/${root.github}/`,
    twitter: (root: { twitter: string }) =>
      root.twitter === undefined
        ? null
        : `https://twitter.com/${root.twitter}/`,
    website: (root: { website: string }) =>
      root.website === undefined
        ? null
        : root.website,
  },
  Book: {
    byPeopleBuy: (root: { id: string }) => {
      return data.people.filter(
        (people: IPeople) => people.books.indexOf(root.id) > -1
      );
    },
    publishedDate: (root: { publishedDate: string }) => {
      return root.publishedDate === undefined ? "?" : root.publishedDate;
    },
    thumbnailUrl: (root: { thumbnailUrl: string }) => {
      return root.thumbnailUrl === undefined ? "?" : root.thumbnailUrl;
    },
    shortDescription: (root: { shortDescription: string }) => {
      return root.shortDescription === undefined ? "?" : root.shortDescription;
    },
    longDescription: (root: { longDescription: string }) => {
      return root.longDescription === undefined ? "?" : root.longDescription;
    },
  },
};

export default typesResolver;
