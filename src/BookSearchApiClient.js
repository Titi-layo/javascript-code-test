import { xml2js } from "xml-js";

export class BookSearchApiClient {
  constructor(config, format) {
    this.basePath = config.basePath || "http://api.book-seller-example.com";
    this.format = format || "json";
  }

  /**
   * Makes fetch call to API
   * @param endpoint API endpoint to make the request to
   * @param options  Options to use in the fetch call
   * @returns Array of book objects
   */
  async fetchData(endpoint, options) {
    const url = new URL(endpoint, this.basePath);
    const response = await fetch(url, {
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed. Returned status of ${response.status}`);
    }

    if (this.format === "json") {
      return await response.json();
    }

    return await response.text();
  }

  /**
   * Requests book my authorname
   * @param {*} authorName author name
   * @param {*} limit number of books
   * @returns Array of book objects by a specific author
   */

  async getBooksByAuthor(authorName, limit = 10) {
    var result = [];

    if (authorName) {
      try {
        const searchParams = new URLSearchParams(
          Object.entries({ q: authorName, limit, format: this.format })
        );
        const url = "/by-author" + "?" + searchParams;

        const response = await this.fetchData(url, {
          "Content-type": this.format,
          method: "GET",
        });

        if (this.format === "xml") {
          const jsResp = xml2js(response, {
            ignoreAttributes: true,
            ignoreComment: true,
            compact: true,
          });

          result = jsResp.books.item.map((item) => ({
            title: item.title["_text"],
            author: item.author["_text"],
            isbn: item.isbn["_text"],
            quantity: item.quantity["_text"],
            price: item.price["_text"],
          }));
        } else {
          result = response.map(function (item) {
            return {
              title: item.title,
              author: item.author,
              isbn: item.isbn,
              quantity: item.quantity,
              price: item.price,
            };
          });
        }
      } catch (err) {
        console.error(`Error fetching books by ${authorName} - ${err.message}`);
      }
    } else {
      console.error("Invalid query search params");
    }

    return result;
  }

  /**
   * Requests book my publisher
   * @param {*} authorName publisher name
   * @param {*} limit number of books
   * @returns Array of book objects by a specific publisher
   */

  async getBooksByPublisher(publisherName, limit = 10) {
    var result = [];

    if (publisherName) {
      try {
        const searchParams = new URLSearchParams(
          Object.entries({ publisherName, limit, format: this.format })
        );
        const url = "/by-publisher" + "?" + searchParams;

        const response = await this.fetchData(url, {
          "Content-type": this.format,
          method: "GET",
        });

        if (this.format === "xml") {
          const jsResp = xml2js(response, {
            ignoreAttributes: true,
            ignoreComment: true,
            compact: true,
          });

          result = jsResp.books.item.map((item) => ({
            title: item.title["_text"],
            author: item.author["_text"],
            isbn: item.isbn["_text"],
            quantity: item.quantity["_text"],
            price: item.price["_text"],
          }));
        } else {
          /**JSON is the default format */
          result = response.map(function (item) {
            return {
              title: item.title,
              author: item.author,
              isbn: item.isbn,
              quantity: item.quantity,
              price: item.price,
            };
          });
        }
      } catch (err) {
        console.error(
          `Error fetching books by ${publisherName} - ${err.message}`
        );
      }
    } else {
      console.error("Invalid query search params");
    }

    return result;
  }
}
