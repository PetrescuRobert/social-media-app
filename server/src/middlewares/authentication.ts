import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export default function authRequiredMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //check if the request have the authorization JWt token
  const authenticationHeader = req.headers.authorization;
  if (authenticationHeader === undefined) {
    res.status(401).send({
      message: "Unauthorized request!",
    });
    return;
  }

  const token = authenticationHeader.split(" ")[1];
  console.log(token);
  try {
    dotenv.config();
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    req.body.user = user;
    next();
  } catch (err) {
    res.status(401).send({
      message: "Unauthorized action!",
    });
  }
}
