const dotenv = require("dotenv");
let log = console.log;

const bcrypt = require("bcrypt");
const { UserModel } = require("../db");
const jwt = require("jsonwebtoken");
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  /*Basic schema structure:
          {{username:'username',password:'password',userId:'userId',todos:{{todo:'todo1',todoId;'todo1Id1'}}}
      */

  let token = req.headers.token;
  if (token) {
    try {
      const response = jwt.verify(token, process.env.JWT_SECRET);
      if (response) {
        next();
        return;
      }
      res.json({
        message: "JWT_SECRET did not generate this token.",
        status: 403,
      });
      return;
    } catch (e) {
      res.json({
        message: "unknown error",
        status: 403,
      });
      log(`Unknown error occured, ${e}`);
    }
  } else if (!req.body.email) {
    //Directrly trying to go to /todos url without logging in should throw an error.
    res.json({ message: "Please login first" });
  } else {
    const password = req.body.password;
    try {
      const response = await UserModel.findOne({ email: req.body.email });
      log(password);
      const passwordMatch = bcrypt.compare(password, response.password);
      if (!passwordMatch) {
        res.json({ message: "Invalid credentials" });
        return;
      } else {
        req.body.id = response._id.toString();
        // log(req.body.id);
        next();
        return;
      }
    } catch (e) {
      res.json({ message: "Enter a valid email and password." });
      log(e);
    }
  }
}

module.exports = userMiddleware;
