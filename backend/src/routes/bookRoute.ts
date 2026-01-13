import { Router,Request, Response } from "express";
import { getBooks,addBook, updateBook, deleteBook,deleteBooksByName,deleteSelectedNames } from "../controllers/bookController";

const bookRouter=Router();

bookRouter.get("/get-books",getBooks)
bookRouter.post("/add-book",addBook)
bookRouter.put("/update-book/:id",updateBook)
bookRouter.delete("/delete-book/by-name-all",deleteBooksByName)
bookRouter.delete("/delete-book/by-names",deleteSelectedNames)
bookRouter.delete("/delete-book/:id",deleteBook)
// bookRouter.delete("/delete-book/by-name/single",deleteBooksByName)

export default bookRouter;