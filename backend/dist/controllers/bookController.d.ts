import { Request, Response } from "express";
export declare const getBooks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBooksByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteSelectedNames: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=bookController.d.ts.map