import express from "express";
import { connectToDatabase } from "./services/database.service";
import { usersRouter } from "./routes/users.router";
import { authRouter } from "./routes/auth.router";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

connectToDatabase()
  .then(() => {
    app.use("/users", usersRouter);
    app.use("/auth", authRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
