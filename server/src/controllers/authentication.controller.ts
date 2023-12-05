import { Request, Response } from "express";
import User from "../models/user";
import * as bcrypt from "bcrypt";
import { collections } from "../services/database.service";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";

export const signUp = async (req: Request, res: Response) => {
  const newUser = new User(
    req.body.name as string,
    req.body.email as string,
    bcrypt.hashSync(req.body.password as string, 10)
  );
  collections.users
    .insertOne(newUser)
    .then((_res) =>
      res.status(500).send({ message: "Your account was created" })
    )
    .catch((_err) =>
      res
        .status(500)
        .send({ message: "Account was not created. Internal server error" })
    );
};

export const signIn = async (req: Request, res: Response) => {
  //get user data from request
  const email: string = req.body.email as string;
  const password: string = req.body.password as string;

  //search user in db by email
  const user = await collections.users.findOne<User>({ email: email });
  if (!user) return res.status(500).send({ message: "User not found" });

  //check if user password is valid
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    return res.status(401).send({
      accessToken: null,
      message: "Invalid password",
    });

  //user data was corrent => provide access (generate JWT)
  dotenv.config();
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400,
  });
  res.status(200).send({
    id: new ObjectId(user.id).toString(),
    email: user.email,
    name: user.name,
    accessToken: token,
  });
};
