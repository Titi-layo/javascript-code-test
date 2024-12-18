import { BookSearchApiClient } from "../BookSearchApiClient";
import { booksJson, booksXml, booksXmlToJs } from "./testData";

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
      json: async () => booksJson,
      text: async () => booksXml,
    });
  });

  describe("getBooksByAuthor", () => {
    it("should call fetch with the correct paramters", async () => {
      const client = new BookSearchApiClient("json");
      await client.getBooksByAuthor("some-author", 10);
      const url = new URL(
        "/by-author?q=some-author&limit=10&format=json",
        "http://api.book-seller-example.com"
      );
      expect(mockedFetch).toHaveBeenCalledWith(url, {
        "Content-type": "json",
        method: "GET",
      });
    });

    it("should handle incorrect query params", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooksByAuthor();
      expect(books).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("Invalid query search params");
    });

    it("should fetch data in json format", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooksByAuthor("some-author", 10);
      expect(books).toEqual(booksJson);
    });

    it("should fetch data in xml format", async () => {
      const client = new BookSearchApiClient({}, "xml");
      const books = await client.getBooksByAuthor("some-author", 10);
      expect(books).toEqual(booksXmlToJs);
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

    it("should log error for unsupported format", async () => {
      const client = new BookSearchApiClient({}, "some-random-format");
      await client.getBooksByAuthor("some-author", 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by some-author - some-random-format is not Supported`
      );
    });
  });

  describe("getBooksByPublisher", () => {
    it("should call fetch with the correct paramters", async () => {
      const client = new BookSearchApiClient("json");
      await client.getBooksByAuthor("some-publisher", 10);
      const url = new URL(
        "/by-publisher?q=some-publisher&limit=10&format=json",
        "http://api.book-seller-example.com"
      );
      expect(mockedFetch).toHaveBeenCalledWith(url, {
        "Content-type": "json",
        method: "GET",
      });
    });

    it("should handle incorrect query params", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooksByPublisher();
      expect(books).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("Invalid query search params");
    });

    it("should fetch data in json format", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooksByPublisher("some-publisher", 10);
      expect(books).toEqual(booksJson);
    });

    it("should fetch data in xml format", async () => {
      const client = new BookSearchApiClient({}, "xml");
      const books = await client.getBooksByPublisher("some-publisher", 10);
      expect(books).toEqual(booksXmlToJs);
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

    it("should log error for unsupported format", async () => {
      const client = new BookSearchApiClient({}, "some-random-format");
      await client.getBooksByPublisher("some-publisher", 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by some-publisher - some-random-format is not Supported`
      );
    });
  });

  describe("getBooks", () => {
    it("should call fetch with the correct paramters", async () => {
      const client = new BookSearchApiClient("json");
      await client.getBooks("ISBN", 36346332947, 10);
      const url = new URL(
        "/by-isbn?q=36346332947&limit=10&format=json",
        "http://api.book-seller-example.com"
      );
      expect(mockedFetch).toHaveBeenCalledWith(url, {
        "Content-type": "json",
        method: "GET",
      });
    });

    it("should handle incorrect query params", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooks();
      expect(books).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("Invalid query search params");
    });

    it("should fetch data in json format", async () => {
      const client = new BookSearchApiClient({}, "json");
      const books = await client.getBooks("ISBN", 3453838466, 10);
      expect(books).toEqual(booksJson);
    });

    it("should fetch data in xml format", async () => {
      const client = new BookSearchApiClient({}, "xml");
      const books = await client.getBooks("ISBN", 34564276478, 10);
      expect(books).toEqual(booksXmlToJs);
    });

    it("should log error if fetch fails", async () => {
      mockedFetch.mockResolvedValue({
        status: "500",
        statusText: "Error",
        ok: false,
        json: async () => ({ error: "some-error" }),
      });
      const client = new BookSearchApiClient({}, "json");
      await client.getBooks("ISBN", 34563743776, 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by ISBN - Request failed. Returned status of 500`
      );
    });

    it("should log error for unsupported format", async () => {
      const client = new BookSearchApiClient({}, "some-random-format");
      await client.getBooks("ISBN", 3463664656, 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by ISBN - some-random-format is not Supported`
      );
    });

    it("should log error for unsupported query type", async () => {
      const client = new BookSearchApiClient({}, "json");
      await client.getBooks("some-random-query-type", 3463664656, 10);
      expect(logSpy).toHaveBeenCalledWith(
        `Error fetching books by some-random-query-type - Unsupported query type`
      );
    });
  });
});
