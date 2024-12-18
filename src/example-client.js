import { BookSearchApiClient } from "./BookSearchApiClient.js";

const client = new BookSearchApiClient();
const booksByShakespeare = client.getBooksByAuthor("Shakespeare", 10);
const booksByPenguin = client.getBooksByPublisher("Penguin", 10);
