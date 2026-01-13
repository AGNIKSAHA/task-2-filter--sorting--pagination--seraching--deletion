"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSelectedNames = exports.deleteBooksByName = exports.deleteBook = exports.updateBook = exports.addBook = exports.getBooks = void 0;
const Book_1 = require("../models/Book");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryObject = {};
        // author filter
        if (typeof req.query.author === "string") {
            queryObject.author = new RegExp(req.query.author, "i");
        }
        // name filter
        if (typeof req.query.name === "string") {
            queryObject.name = new RegExp(req.query.name, "i");
        }
        // description filter
        if (typeof req.query.description === "string") {
            queryObject.description = new RegExp(req.query.description, "i");
        }
        // ======================
        // publishYear filters (FIXED)
        // ======================
        const yearFilter = {};
        // EQUAL
        if (typeof req.query.publishYear === "string") {
            const year = Number(req.query.publishYear);
            if (!isNaN(year)) {
                queryObject.publishYear = year;
            }
        }
        // GREATER THAN
        if (typeof req.query.publishYear_gt === "string") {
            const year = Number(req.query.publishYear_gt);
            if (!isNaN(year))
                yearFilter.$gt = year;
        }
        // GREATER THAN OR EQUAL
        if (typeof req.query.publishYear_gte === "string") {
            const year = Number(req.query.publishYear_gte);
            if (!isNaN(year))
                yearFilter.$gte = year;
        }
        // LESS THAN
        if (typeof req.query.publishYear_lt === "string") {
            const year = Number(req.query.publishYear_lt);
            if (!isNaN(year))
                yearFilter.$lt = year;
        }
        // LESS THAN OR EQUAL
        if (typeof req.query.publishYear_lte === "string") {
            const year = Number(req.query.publishYear_lte);
            if (!isNaN(year))
                yearFilter.$lte = year;
        }
        // APPLY RANGE FILTER (overrides equality)
        if (Object.keys(yearFilter).length > 0) {
            queryObject.publishYear = yearFilter;
        }
        // ======================
        // QUERY BUILD
        // ======================
        let apiData = Book_1.Book.find(queryObject);
        // SORT
        if (typeof req.query.sort === "string") {
            const sortFields = req.query.sort.split(",");
            const sortObject = {};
            sortFields.forEach(field => {
                if (field.startsWith("-")) {
                    sortObject[field.substring(1)] = -1;
                }
                else {
                    sortObject[field] = 1;
                }
            });
            apiData = apiData.sort(sortObject);
        }
        // SELECT
        if (typeof req.query.select === "string") {
            const fields = req.query.select.split(",").join(" ");
            apiData = apiData.select(fields);
        }
        // PAGINATION
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);
        const books = yield apiData;
        return res.status(200).json({
            success: true,
            message: "Books found",
            data: books
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error.message}`
            });
        }
    }
});
exports.getBooks = getBooks;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, author, publishYear, description } = req.body;
    console.log("This data ", name, author, publishYear, description);
    try {
        const book = yield Book_1.Book.create({
            author,
            description,
            name,
            publishYear,
        });
        return res
            .status(201)
            .json({ success: true, message: "Book added", data: book });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, author, publishYear, description } = req.body;
    try {
        const book = yield Book_1.Book.findByIdAndUpdate(id, { name, author, publishYear, description }, { new: true });
        if (!book)
            return res
                .status(404)
                .json({ success: false, message: "No Book found" });
        return res
            .status(200)
            .json({ success: true, message: "Book change", data: book });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield Book_1.Book.findByIdAndDelete(id);
        if (!book) {
            return res
                .status(404)
                .json({ success: false, message: "no book Found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Book Deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
});
exports.deleteBook = deleteBook;
const deleteBooksByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (typeof name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }
        const result = yield Book_1.Book.deleteMany({
            name: new RegExp(`^${name}$`, "i"), // case-insensitive exact match
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No records found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Books deleted successfully",
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Unexpected server error",
        });
    }
});
exports.deleteBooksByName = deleteBooksByName;
const deleteSelectedNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { names } = req.body;
        // Validate input
        if (!Array.isArray(names) || names.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Names array is required",
            });
        }
        // Delete records
        const result = yield Book_1.Book.deleteMany({
            name: { $in: names },
        });
        return res.status(200).json({
            success: true,
            message: "Selected records deleted successfully",
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Unexpected server error",
        });
    }
});
exports.deleteSelectedNames = deleteSelectedNames;
//# sourceMappingURL=bookController.js.map