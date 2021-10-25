import { getUserId } from "./middleware/jwtMiddleware";
import * as dotenv from "dotenv";
import express, { Router } from "express";
import cors from "cors";
import * as bodyparser from "body-parser";
import { UserRouter } from "./routes/userRouter";
import { categoryRouter } from "./routes/categoryRouter";
import { subCategoryRouter } from "./routes/subCategoryRouter";
import { quizRouter } from "./routes/quizRouter";
import { favouriteRouter } from "./routes/favouriteRouter";
import jwt from "jsonwebtoken";
import { resultRouter } from "./routes/resultRouter";
import { responseRouter } from "./routes/responseRouter";
import { GameRouter } from "./routes/gameRouter";

class App {
  public app: express.Application;
  public useroutes: UserRouter = new UserRouter();
  public categoryRouter: categoryRouter = new categoryRouter();
  public subCategoryRouter: subCategoryRouter = new subCategoryRouter();
  public quizRouter: quizRouter = new quizRouter();
  public favouriteRouter: favouriteRouter = new favouriteRouter();
  public resultRouter: resultRouter = new resultRouter();
  public responseRouter: responseRouter = new responseRouter();
  public GameRouter: GameRouter = new GameRouter();


  constructor() {
    this.app = express();
    this.config();
    this.useroutes.routes(this.app);
    this.categoryRouter.routes(this.app);
    this.subCategoryRouter.routes(this.app);
    this.quizRouter.routes(this.app);
    this.favouriteRouter.routes(this.app);
    this.resultRouter.routes(this.app);
    this.responseRouter.routes(this.app);
    this.GameRouter.routes(this.app)
  }
  private config(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(getUserId);
  }
}
export default new App().app;