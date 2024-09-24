const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("../db/index");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const requiredBody = z.object({
    email: z.string().max(50).min(11).email(),
    name: z.string().min(1).max(10),
    password: z.string(),
  });
  // console.log(req.body);
  const parsedBody = requiredBody.safeParse(req.body);
  console.log(parsedBody.error);
  if (!parsedBody.success) {
    res.json({
      message: "Incorrect format" + parsedBody.error,
    });
    return;
  } else {
    console.log(
      await UserModel.findOne({
        email: parsedBody.data.email,
        password: parsedBody.data.password,
        name: parsedBody.data.name,
      })
    );
    if (await UserModel.findOne({ email: parsedBody.data.email })) {
      res.json({
        message:
          "User with given email already exists.Try with a different email.",
      });
      return;
    } else {
      const email = parsedBody.data.email;
      const name = parsedBody.data.name;
      const password = parsedBody.data.password;
      const hashedPassword = await bcrypt.hash(password, 5);
      try {
        await UserModel.create({
          email: email,
          name: name,
          password: hashedPassword,
        });
        let response = await UserModel.findOne({ email: email });

        token = jwt.sign({ id: response._id }, process.env.JWT_SECRET);
        res.json({
          status: 200,
          message: "You have signed up",
          token: token,
        });
      } catch (e) {
        res.json({ message: "Error signingup.try again after some time." + e });
      }
    }
    // if(parsedBody.data.email)
  }
});

router.post("/login", userMiddleware, async (req, res) => {
  // Implement user login logic
  // res.send("You've logged in");

  const response = await UserModel.findOne({ email: req.body.email });
  log(password);
  const passwordMatch = bcrypt.compare(password, response.password);
  if (!passwordMatch) {
    res.json({ token: null });
    return;
  }

  token = jwt.sign({ id: req.body.id }, process.env.JWT_SECRET, {
    noTimestamp: true,
  });
  console.log(token);
  const check = jwt.verify(token, process.env.JWT_SECRET);
  console.log(check);
  res.json({ token: token });
});

router.get("/todos", userMiddleware, (req, res) => {
  // Implement logic for getting todos for a user
});

router.post("/logout", userMiddleware, (req, res) => {
  // Implement logout logic
});
router.get("/", (req, res) => {
  //   res.send("Herwrwe");
  res.json({ message: "You are on landing page." });
});
module.exports = router;
