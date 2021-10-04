import Router from "express";
import BooksController from "../controllers/booksController.js";

const booksRouter = new Router();

booksRouter.get('', BooksController.getBooks);
booksRouter.post('/add', BooksController.addBook);
booksRouter.get('/all', BooksController.get);



export default booksRouter;