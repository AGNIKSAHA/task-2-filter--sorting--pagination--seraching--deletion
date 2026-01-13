"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./utils/db");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 8080;
//DB Connect
(0, db_1.connectDb)();
//middlewares
app.use((0, cors_1.default)({
    origin: process.env.HOST_URL || "*"
}));
app.use(express_1.default.json());
// app.use("/api", bookRouter);
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    // res.send("Hello World");
    res.json({ success: true, message: "Hello World" });
});
app.listen(port, () => console.log(`Server running on port ${port} `));
//status codes
//1xx: Informational
//2xx: success
//3xx: redirectional
//4xx: client side
//5xx: server side
//# sourceMappingURL=server.js.map