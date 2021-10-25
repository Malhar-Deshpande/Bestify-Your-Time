import jwt from "jsonwebtoken";
import { configSecret } from "../jwtConfigSecret";
import * as express from "express";


export function getUserId(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  if (request.url == "/login" || request.url == "/signup") {
    next();
  } else {
    try {
      const token: any = request.headers["token"];
      //for postman testing use JSON.parse(token)
      //const decode: any = jwt.verify(JSON.parse(token), configSecret.secret);
      const decode: any = jwt.verify(token, configSecret.secret);
      request.body.user_id = decode.user_id;
      next();
    } catch (ex) {
      response.status(401);
      response.send({ status: "error", error: "protcted api" });
    }
  }
}
