import { Router } from "express";
import { bookController } from "../../infrastructure/config/bootstrap";

const bookRouter = Router();

bookRouter.post("/books", bookController.create.bind(bookController));
bookRouter.post("/book/borrow", bookController.borrowBook.bind(bookController));
bookRouter.post("/book/return", bookController.returnBook.bind(bookController));
bookRouter.get("/books", bookController.list.bind(bookController));

export default bookRouter;