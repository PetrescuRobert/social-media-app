// External Dependencies
import express from "express";
import { getAllUsers, insertUser } from "../controllers/users.controller";
import authRequiredMiddleware from "../middlewares/authentication";
// Global Config
export const usersRouter = express.Router();
//add middlewares
usersRouter.use(express.json());
usersRouter.use(authRequiredMiddleware);
// GET
usersRouter.get("/", getAllUsers);
// POST
usersRouter.post("/", insertUser);
// PUT

// DELETE
