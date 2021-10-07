import Library from "../models/books.js";
import TokenSchema from "../models/token.js";
import Favorite from "../models/favorite.js";
import { verifyJWT } from "../encrypting/token.js";

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
    async getBook(req, res) {
        try {
            console.log('запрос пришел')
            const id = req.params.id;
            console.log(id)
            const book = await Library.findById(id);
            if (book) {
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
            const checkBook = await Library.findOne({ name: book.name });
            if (checkBook) {
                res.status(400).json({ msg: 'Такая книга уже есть' });
            } else {
                console.log('почти создал');
                const addBook = await Library.create({ ...book });
                res.json(addBook);
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addToFavorite(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const data = verifyJWT(refreshToken);
            const tokenId = JSON.stringify(data.id);
            const checkToken = await TokenSchema.findOne({ tokenId: tokenId });
            if (checkToken) {
                const bookId = req.params.id;
                const deleteFavorite = await Favorite.findOneAndDelete({ userId: checkToken.userId, bookId: bookId });
                if (!deleteFavorite) {
                    await Favorite.create({ userId: checkToken.userId, bookId: bookId });
                    const favorite = await Favorite.find({ userId: checkToken.userId });
                    res.json(favorite);
                } else {
                    const favorite = await Favorite.find({ userId: checkToken.userId });
                    res.json(favorite);
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getToDashboard(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const data = verifyJWT(refreshToken);
            const tokenId = JSON.stringify(data.id);
            const checkToken = await TokenSchema.findOne({ tokenId: tokenId });
            if (checkToken) {
                const favorite = await Favorite.find({ userId: checkToken.userId });
                if (favorite.length > 0) {
                    let booksId = [];
                    for (let i = 0; i < favorite.length; i++) {
                        booksId[i] = favorite[i].bookId
                    }
                    const getFav = await Library.find({ _id: booksId })
                    res.json(getFav)
                } else {
                    res.status(404).json({ message: 'Not Found' })
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getFavorite(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const data = verifyJWT(refreshToken);
            const tokenId = JSON.stringify(data.id);
            const checkToken = await TokenSchema.findOne({ tokenId: tokenId });
            if (checkToken) {
                const favorite = await Favorite.find({ userId: checkToken.userId });
                res.json(favorite);
            } else {
                return res.json();
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteBook(req, res) {
        try {
            console.log('запрос на удаление пришле');
            console.log(req.body);
            const bookId = req.body.bookId
            console.log(bookId);
            const deleteBook = await Library.findByIdAndDelete(bookId)
            console.log(deleteBook);
            await Favorite.deleteMany({ bookId: bookId })
            res.json(deleteBook)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();
