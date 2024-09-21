//  start writing your code from hereconst { todoRouter } = require("express");
const { Router, response } = require("express");
const { UserModel, TodoModel } = require("../db");
const adminMiddleware = require("../middleware/user");
const todoRouter = Router();
const jwt = require("jsonwebtoken");
let log = console.log;
// todo Routes
todoRouter.post("/addTodo", async (req, res) => {
  // Implement todo creation logic
  let token = req.headers.token;
  let description = req.body.description;
  let userData = jwt.verify(token, process.env.JWT_SECRET);
  let userId = userData.id;
  let response = await TodoModel.find({
    userId: userId,
    description: description,
  });
  if (response.length > 0) {
    try {
      try {
        await TodoModel.updateMany(
          { userId: userId, description: description },
          { $set: { isRepeating: true } }
        );
      } catch (e) {
        console.log(`${e}`);
      }
      await TodoModel.create({
        userId: userId,
        description: description,
        done: false,
        isRepeating: true,
        index: response.length,
      });
      console.log(`Todo ${description} created.`);
      res.json({ message: `Todo ${description} created` });
      return;
    } catch (e) {
      console.log(`Unknown error ${e}`);
      return;
    }
  }
  log("here");
  try {
    await TodoModel.create({
      userId: userId,
      description: description,
      done: false,
      isRepeating: false,
      index: 0,
    }).then(res.json({ message: "First record" }));
    console.log(`Todo ${description} created.`);
    return;
  } catch (e) {
    console.log(e);
  }
  // console.log(userData);
});

todoRouter.put("/todos", adminMiddleware, async (req, res) => {
  // Implement update todo  logic
  try {
    let token = req.headers.token;
    let userData = jwt.verify(token, process.env.JWT_SECRET);
    let userId = userData.id;
    let index = req.body.index;
    let oldTodo = req.body.oldTodo;
    let newTodo = req.body.newTodo;
    let todoWithGivenDescription = await TodoModel.find({
      userId: userId,
      description: oldTodo,
    });
    log(todoWithGivenDescription);
    // for(let i=0;i<todoWithGivenDescription.length;i++){
    //   if()
    // }

    let requiredObject = todoWithGivenDescription[index];
    log(requiredObject);
    await TodoModel.updateOne(requiredObject, {
      $set: { description: newTodo },
    });
    let todoWithNewDescription = await TodoModel.find({
      userId: userId,
      description: newTodo,
    });
    if (todoWithNewDescription.length > 1) {
      for (let i = 0; i < todoWithNewDescription.length; i++) {
        await TodoModel.updateOne(todoWithNewDescription[i], {
          $set: { isRepeating: true, index: i },
        });
      }
    } else {
      for (let i = 0; i < todoWithNewDescription.length; i++) {
        await TodoModel.updateOne(todoWithNewDescription[i], {
          $set: { isRepeating: false, index: i },
        });
      }
    }
    res.json({ message: `${oldTodo} has been updated to ${newTodo}` });
    log("updated");
    return;
  } catch (e) {
    log(e);
  }
  // log("Updated");
});

todoRouter.delete("/api/deleteTodo", adminMiddleware, async (req, res) => {
  // Implement delete todo logic
  try {
    let token = req.headers.token;
    let index = req.body.index;
    let todo = req.body.description;
    let userData = jwt.verify(token, process.env.JWT_SECRET);
    let userId = userData.id;
    let todosObjects = await TodoModel.find({
      userId: userId,
      description: todo,
    });
    let todoToBeDeleted = todosObjects[index];
    await TodoModel.deleteOne(todoToBeDeleted)
      .then(() => {
        console.log(`Deleted ${todo} at index ${index}`);
        res.json({ message: `Deleted ${todo} at index ${index}` });
        return;
      })
      .catch((response) => {
        console.error(response);
      });
  } catch (e) {
    console.log(e);
  }
});

todoRouter.delete("/:id", adminMiddleware, (req, res) => {
  // Implement delete todo by id logic
});

todoRouter.get("/todos", adminMiddleware, async (req, res) => {
  // Implement fetching all todo logic
  let token = req.headers.token;
  let userData = jwt.verify(token, process.env.JWT_SECRET);
  let userId = userData.id;
  let todosObjects = await TodoModel.find({ userId: userId });
  // console.log(todosObjects);
  // log("here after adding");
  let todos = [];
  for (let i = 0; i < todosObjects.length; i++) {
    todos.push(todosObjects[i].description);
  }
  res.json({ todos: todos });
  return;
});

todoRouter.get("/:id", adminMiddleware, (req, res) => {
  // Implement fetching todo by id logic
});

module.exports = todoRouter;
