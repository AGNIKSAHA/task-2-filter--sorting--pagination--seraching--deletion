import { Request, Response } from "express";
import { Book } from "../models/Book";

interface IResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

interface ProductQuery {
  name?: RegExp;
  author?: RegExp;
  publishYear?: number | {
    $gte?: number;
    $lte?: number;
    $gt?: number;
    $lt?: number;
  };
  description?: RegExp;
}

export const getBooks = async (req: Request, res: Response) => {
  try {
    const queryObject: ProductQuery = {};

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

const yearFilter: {
  $gt?: number;
  $gte?: number;
  $lt?: number;
  $lte?: number;
} = {};

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
  if (!isNaN(year)) yearFilter.$gt = year;
}

// GREATER THAN OR EQUAL
if (typeof req.query.publishYear_gte === "string") {
  const year = Number(req.query.publishYear_gte);
  if (!isNaN(year)) yearFilter.$gte = year;
}

// LESS THAN
if (typeof req.query.publishYear_lt === "string") {
  const year = Number(req.query.publishYear_lt);
  if (!isNaN(year)) yearFilter.$lt = year;
}

// LESS THAN OR EQUAL
if (typeof req.query.publishYear_lte === "string") {
  const year = Number(req.query.publishYear_lte);
  if (!isNaN(year)) yearFilter.$lte = year;
}

// APPLY RANGE FILTER (overrides equality)
if (Object.keys(yearFilter).length > 0) {
  queryObject.publishYear = yearFilter;
}


    // ======================
    // QUERY BUILD
    // ======================

    let apiData = Book.find(queryObject);

    // SORT
    if (typeof req.query.sort === "string") {
      const sortFields = req.query.sort.split(",");
      const sortObject: Record<string, 1 | -1> = {};

      sortFields.forEach(field => {
        if (field.startsWith("-")) {
          sortObject[field.substring(1)] = -1;
        } else {
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

    const books = await apiData;

    return res.status(200).json({
      success: true,
      message: "Books found",
      data: books
    } as IResponse);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message}`
      } as IResponse);
    }
  }
};


export const addBook = async (req: Request, res: Response) => {
  const { name, author, publishYear, description } = req.body;
  console.log("This data ", name, author, publishYear, description);

  try {
    const book = await Book.create({
      author,
      description,
      name,
      publishYear,
    });

    return res
      .status(201)
      .json({ success: true, message: "Book added", data: book } as IResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, author, publishYear, description } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { name, author, publishYear, description },
      { new: true }
    );
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "No Book found" } as IResponse);
    return res
      .status(200)
      .json({ success: true, message: "Book change", data: book } as IResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ success: false, message: error.message } as IResponse);
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "no book Found" } as IResponse);
    }
    return res
      .status(200)
      .json({ success: true, message: "Book Deleted" } as IResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ success: false, message: error.message } as IResponse);
    }
  }
};

export const deleteBooksByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const result = await Book.deleteMany({
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
  } catch (error: unknown) {
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
};

export const deleteSelectedNames = async (req: Request, res: Response) => {
  try {
    const { names } = req.body as { names?: string[] };

    // Validate input
    if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Names array is required",
      });
    }

    // Delete records
    const result = await Book.deleteMany({
      name: { $in: names },
    });

    return res.status(200).json({
      success: true,
      message: "Selected records deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error: unknown) {
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
};
