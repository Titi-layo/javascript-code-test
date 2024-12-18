export const booksJson = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J. K. Rowling",
    isbn: 384837487347,
    quantity: 3,
    price: 10,
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J. R. R. Tolkien",
    isbn: 384837487347,
    quantity: 3,
    price: 10,
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    author: "Brent Weeks",
    isbn: 384837487347,
    quantity: 3,
    price: 10,
  },
];

export const booksXml = `<books><item><title>Harry Potter and the Goblet of Fire"</title><isbn>384837487347</isbn><author>Brent Weeks</author><quantity>3</quantity><price>10</price></item><item><title>Harry Potter and the Prisoner of Azkaban</title><isbn>384837487347</isbn><author>J. K. Rowling</author><quantity>3</quantity><price>10</price></item></books>`;

export const booksXmlToJs = [
  {
    author: "Brent Weeks",
    isbn: "384837487347",
    price: "10",
    quantity: "3",
    title: 'Harry Potter and the Goblet of Fire"',
  },
  {
    author: "J. K. Rowling",
    isbn: "384837487347",
    price: "10",
    quantity: "3",
    title: "Harry Potter and the Prisoner of Azkaban",
  },
];
