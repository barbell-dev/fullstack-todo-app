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
console.log(process.env.PORT);
app.use(
  cors({
    origin: ["https://wrapitupasap.netlify.app"],
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
app.delete("/todo", todoRouter.delete("/todo"));
// app.post("/todos")
//  start writing your routes here

app.listen(port, () => console.log(`server is running at localhost:${port}`));
