const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());

const posts = [
  { username: "mohamed", title: "Post 1" },
  { username: "wassim", title: "Post 2" },
  { username: "ahmed", title: "Post 3" },
];

const users = [];

app.get("/users", async (req, res) => {
  res.json(users);
});
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      password: hashedPassword,
    };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
    console.error(err);
  }
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", async (req, res) => {
  // authenticate user
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user);
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (error) {
    res.status(500).send();
    console.error(error);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function generateAccessToken(user) {
  return (accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET));
}
function generateRefreshToken(user) {
  return (accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET));
}

// Start the server and synchronize models

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
