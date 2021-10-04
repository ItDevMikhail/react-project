import Library from "../models/books.js";

class BooksController {
    async getBooks(req, res) {
        try {
            console.log('запрос пришел')
            const book = await Library.find();
            if (book.length > 0) {
                res.json(book);
            } else {
                res.status(404).json({ message: 'Библиотека книг пуста' })
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addBook(req, res) {
        try {
            const book = req.body;
            const checkBook = await Library.findOne({ name: book.name })
            if (checkBook) {
                res.status(400).json({ msg: 'Такая книга уже есть' })
            } else {
                console.log('почти создал')
                const addBook = await Library.create({ ...book })
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async get(req, res) {
        try {
                res.json({message: 'Запрос успешен'});
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();
