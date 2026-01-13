"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const bookRouter = (0, express_1.Router)();
bookRouter.get("/get-books", bookController_1.getBooks);
bookRouter.post("/add-book", bookController_1.addBook);
bookRouter.put("/update-book/:id", bookController_1.updateBook);
bookRouter.delete("/delete-book/by-name-all", bookController_1.deleteBooksByName);
bookRouter.delete("/delete-book/by-names", bookController_1.deleteSelectedNames);
bookRouter.delete("/delete-book/:id", bookController_1.deleteBook);
// bookRouter.delete("/delete-book/by-name/single",deleteBooksByName)
exports.default = bookRouter;
//# sourceMappingURL=bookRoute.js.map