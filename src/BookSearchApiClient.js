import { xml2js } from "xml-js";

export class BookSearchApiClient {
  constructor(config, format) {
    this.basePath = config.basePath || "http://api.book-seller-example.com";
    this.format = format || "json";
    this.limit = 10;
  }

  /**
   * Makes fetch call to API
   * @param endpoint API endpoint to make the request to
   * @param options  Options to use in the fetch call
   * @returns API response - can either be json or text
   */
  async fetchData(endpoint, options) {
    const url = new URL(endpoint, this.basePath);
    const response = await fetch(url, {
      method: "GET",
      "Content-type": this.format,
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
   * Format API response into Book format
   * @param response API reponse (json / xml supported)
   */
  formatResponse(response) {
    let result;
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
    } else if (this.format === "json") {
      result = response.map(function (item) {
        return {
          title: item.title,
          author: item.author,
          isbn: item.isbn,
          quantity: item.quantity,
          price: item.price,
        };
      });
    } else {
      throw new Error(`${this.format} is not Supported`);
    }

    return result;
  }

  /**
   * Requests book my authorname
   * @param {*} authorName author name
   * @param {*} limit number of books
   * @returns Array of book objects by a specific author
   */

  async getBooksByAuthor(authorName, limit = this.limit) {
    var result = [];

    if (authorName) {
      try {
        const searchParams = new URLSearchParams(
          Object.entries({ q: authorName, limit, format: this.format })
        );
        const url = "/by-author" + "?" + searchParams;

        const response = await this.fetchData(url, {});

        result = this.formatResponse(response);
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
   * @param {*} publisherName publisher name
   * @param {*} limit number of books
   * @returns Array of book objects by a specific publisher
   */

  async getBooksByPublisher(publisherName, limit = this.limit) {
    var result = [];

    if (publisherName) {
      try {
        const searchParams = new URLSearchParams(
          Object.entries({ q: publisherName, limit, format: this.format })
        );
        const url = "/by-publisher" + "?" + searchParams;

        const response = await this.fetchData(url, {});

        result = this.formatResponse(response);
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
