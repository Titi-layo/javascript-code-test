import { BookSearchApiClient } from "../BookSearchApiClient";
import { books } from "./testData";

global.fetch = jest.fn();
const logSpy = jest.spyOn(console, "error");

describe("BookSearchApiClient", () => {
  const mockedFetch = global.fetch;

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    mockedFetch.mockResolvedValue({
      status: "200",
      statusText: "ok",
      ok: true,
      json: async () => books,
    });
  });

  describe("getBooksByAuthor", () => {
    it("should call fetch with the correct paramters", async () => {
      const client = new BookSearchApiClient("json");
      await client.getBooksByAuthor("some-author", 10);
      const url = new URL(
        "/by-author?authorName=some-author&limit=10&format=json",
        "http://api.book-seller-example.com"
      );
      expect(mockedFetch).toHaveBeenCalledWith(url, {
        "Content-type": "json",
        method: "GET",
      });
    });

    it("should handle incorrect query prams", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooksByAuthor();
      expect(books).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("Invalid query search params");
    });

    it("should fetch data in the correct format", async () => {
      const client = new BookSearchApiClient({}, "json");
      const bookshhh = await client.getBooksByAuthor("some-author", 10);
      expect(bookshhh).toEqual(books);
    });

    it("should log error if fetch fails", async () => {
      mockedFetch.mockResolvedValue({
        status: "500",
        statusText: "Error",
        ok: false,
        json: async () => ({ error: "some-error" }),
      });
      const client = new BookSearchApiClient({}, "json");
      await client.getBooksByAuthor("some-author", 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by some-author - Request failed. Returned status of 500`
      );
    });
  });

  describe("getBooksByPublisher", () => {
    const mockedFetch = global.fetch;

    afterEach(() => {
      jest.resetAllMocks();
    });

    beforeEach(() => {
      mockedFetch.mockResolvedValue({
        status: "200",
        statusText: "ok",
        ok: true,
        json: async () => books,
      });
    });

    it("should call fetch with the correct paramters", async () => {
      const client = new BookSearchApiClient("json");
      await client.getBooksByAuthor("some-publisher", 10);
      const url = new URL(
        "/by-publisher?publisherName=some-publisher&limit=10&format=json",
        "http://api.book-seller-example.com"
      );
      expect(mockedFetch).toHaveBeenCalledWith(url, {
        "Content-type": "json",
        method: "GET",
      });
    });

    it("should handle incorrect query prams", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooksByPublisher();
      expect(books).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("Invalid query search params");
    });

    it("should fetch data in the correct format", async () => {
      const client = new BookSearchApiClient({}, "json");
      const bookshhh = await client.getBooksByPublisher("some-publisher", 10);
      expect(bookshhh).toEqual(books);
    });

    it("should log error if fetch fails", async () => {
      mockedFetch.mockResolvedValue({
        status: "500",
        statusText: "Error",
        ok: false,
        json: async () => ({ error: "some-error" }),
      });
      const client = new BookSearchApiClient({}, "json");
      await client.getBooksByPublisher("some-publisher", 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by some-publisher - Request failed. Returned status of 500`
      );
    });
  });
});
