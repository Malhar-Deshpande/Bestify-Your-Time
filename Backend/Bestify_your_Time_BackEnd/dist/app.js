"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtMiddleware_1 = require("./middleware/jwtMiddleware");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./routes/userRouter");
const categoryRouter_1 = require("./routes/categoryRouter");
const subCategoryRouter_1 = require("./routes/subCategoryRouter");
const quizRouter_1 = require("./routes/quizRouter");
const favouriteRouter_1 = require("./routes/favouriteRouter");
const resultRouter_1 = require("./routes/resultRouter");
const responseRouter_1 = require("./routes/responseRouter");
const gameRouter_1 = require("./routes/gameRouter");
class App {
    constructor() {
        this.useroutes = new userRouter_1.UserRouter();
        this.categoryRouter = new categoryRouter_1.categoryRouter();
        this.subCategoryRouter = new subCategoryRouter_1.subCategoryRouter();
        this.quizRouter = new quizRouter_1.quizRouter();
        this.favouriteRouter = new favouriteRouter_1.favouriteRouter();
        this.resultRouter = new resultRouter_1.resultRouter();
        this.responseRouter = new responseRouter_1.responseRouter();
        this.GameRouter = new gameRouter_1.GameRouter();
        this.app = express_1.default();
        this.config();
        this.useroutes.routes(this.app);
        this.categoryRouter.routes(this.app);
        this.subCategoryRouter.routes(this.app);
        this.quizRouter.routes(this.app);
        this.favouriteRouter.routes(this.app);
        this.resultRouter.routes(this.app);
        this.responseRouter.routes(this.app);
        this.GameRouter.routes(this.app);
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        this.app.use(jwtMiddleware_1.getUserId);
    }
}
exports.default = new App().app;
