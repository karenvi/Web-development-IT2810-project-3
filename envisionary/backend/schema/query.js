const booksData = require('./data')

const query = {
    books: async ({limit}, context) => {
        return limit ? booksData.slice(0, limit) : booksData;
    },
    book: async ({id}, context) => {
        return booksData.find(book => book.id === id);
    }
};

module.exports = query;