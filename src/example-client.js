import { BookSearchApiClient } from "./BookSearchApiClient.js";

const client = new BookSearchApiClient();
client.getBooksByAuthor("Shakespeare", 10);
client.getBooksByPublisher("Penguin", 10);
client.getBooks("Year", 2005, 10);
