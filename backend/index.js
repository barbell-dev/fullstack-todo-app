// import { z } from "zod";
const { z } = require("zod");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/user");
const todoRouter = require("./routes/todo");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: ["https://fullstack-todo-app-two.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(router);
app.get("/", router.get("/"));
app.get("/todos", todoRouter.get("/todos"));
app.put("/todos", todoRouter.put("/todos"));
app.post("/addTodo", todoRouter.post("/addTodo"));
app.post("/login", router.post("/login"));
app.post("/signup", router.post("/signup"));
app.delete("/deleteTodo", todoRouter.delete("/deleteTodo"));
// app.post("/todos")
//  start writing your routes here

app.listen(port, () =>
  console.log(
    `server is running at https://fullstack-todo-app-4beh.onrender.com:${port}`
  )
);
