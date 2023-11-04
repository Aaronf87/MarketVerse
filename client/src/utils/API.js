export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

export const searchBookPrice = (isbn) => {
  return fetch(
    `https://booksrun.com/api/price/sell/${isbn}?key=${process.env.BOOKSRUN_KEY}`
  );
};
