const express = require("express");
const app = express();
const port = 3000;

let users = [
  {
    id: 1,
    name: "user1",
    email: "user1@gmail.com",
    age: 23,
  },
  {
    id: 2,
    name: "user2",
    email: "user2@gmail.com",
    age: 19,
  },
  {
    id: 3,
    name: "user3",
    email: "user3@gmail.com",
    age: 29,
  },
];

app.use(express.static("public"));
app.use(express.json());

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const dataFromScript = req.body;

  const isEmailexit = users.find((user) => user.email === dataFromScript.email);
  if (isEmailexit) {
    const errorMessage = { error: "Email already exit!" };
    res.send(errorMessage);
    throw errorMessage.error;
  }

  users.push(dataFromScript);
  res.send(users);
});

app.delete("/users/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id, 10); //1

  const userFound = users.find((user) => user.id === idToDelete); //true

  const indexToDelete = users.indexOf(userFound); // 0
  users.splice(indexToDelete, 1); // 0 , 1

  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
