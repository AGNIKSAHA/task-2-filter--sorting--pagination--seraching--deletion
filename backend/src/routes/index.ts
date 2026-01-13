import {Router} from "express";
import bookRouter from "./bookRoute";

const routes = Router()

routes.use("/book",bookRouter);



export default routes;