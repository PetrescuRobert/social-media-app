import User from "../models/user";
import { collections } from "../services/database.service";
import { Request, Response } from "express";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await collections.users.find({}).toArray();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const insertUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    console.log(newUser);
    const result = await collections.users?.insertOne(newUser);

    result
      ? res
          .status(201)
          .send(`Successfully created a new user with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new user.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
