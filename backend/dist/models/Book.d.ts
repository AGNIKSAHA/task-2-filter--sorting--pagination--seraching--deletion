interface IBook {
    name: string;
    author: string;
    publishYear: number;
    description: string;
}
declare const Book: import("mongoose").Model<IBook, {}, {}, {}, import("mongoose").Document<unknown, {}, IBook, {}, import("mongoose").DefaultSchemaOptions> & IBook & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IBook>;
export { IBook, Book };
//# sourceMappingURL=Book.d.ts.map