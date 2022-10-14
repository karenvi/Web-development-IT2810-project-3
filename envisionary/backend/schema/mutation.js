let books = require('./data')

const mutation = {
    addBook: async ({ title, author, description }, context) => {
        const book = { id: `${books.length+1}`, title, author, description }
        books.push(book)
        return {
            data: book,
            ok: true,
            error: ''
        };
    },

    updateBook: async ({ id, title, author, description }, context) => {
        const book = books.find(book => book.id === id);
        if (!book) {
            return {
                data: null,
                ok: false,
                error: 'Book not found'
            };
        }

        if (author) book.author = author
        if (title) book.title = title
        if (description) book.description = description
        books = books.map(b => b.id === id ? book : b)
        return {
            data: book,
            ok: true,
            error: ''
        };
    },

    deleteBook: async ({ id }, context) => {
        const book = books.find(book => book.id === id)
        if (!book) {
            return {
                data: null,
                ok: false,
                error: 'Book not found'
            };
        }

        books = books.filter(book => book.id !== id)
        return {
            data: book,
            ok: true,
            error: ''
        };
    }
};

module.exports = mutation