const express = require("express");
const cors = require("cors");
const connection = require("./configure/db");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.get("/", (req, res) => {
  res.send("Social Media Home Page");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (err) {
    console.log("Error while Connection");
  }
  console.log("Server Started");
});
