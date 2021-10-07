import Router from "express";
import BooksController from "../controllers/booksController.js";
import multer from "multer";

const booksRouter = new Router()

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "backend/static");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '.jpg');
    }
});
const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

booksRouter.get('', BooksController.getBooks);
// booksRouter.post('/add', BooksController.addBook);
booksRouter.post('/add', multer({storage:storageConfig, fileFilter: fileFilter}).single("picture"), BooksController.createBook);
booksRouter.get('/detail/:id', BooksController.getBook);
booksRouter.get('/addFavorite/:id', BooksController.addToFavorite);
booksRouter.get('/favorite', BooksController.getFavorite);
booksRouter.delete('', BooksController.deleteBook)
booksRouter.get('/dashboard', BooksController.getToDashboard)



export default booksRouter;