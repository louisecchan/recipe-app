import express from "express"; // serve as a framework to create the api
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import "dotenv/config";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use((_, res, next) => {
  res.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "https://recipe-app-production-dab2.up.railway.app/"
  );
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3001, () =>
      console.log("SERVER STARTED <3")
    );
  })
  .catch((error) => {
    console.log(error);
  });
