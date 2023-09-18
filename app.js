import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;
let tasks = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    tasks,
  });
});

app.get("/list", (req, res) => {
  res.render("list.ejs", {
    tasks,
  });
});

app.post("/add", (req, res) => {
  const { todo } = req.body;
  const task = {
    id: crypto.randomUUID(),
    todo,
    complete: false,
    createdAt: new Date().getTime(),
  };
  tasks.push(task);
  res.render("index.ejs", {
    tasks,
  });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;

  tasks = tasks.filter((task) => {
    return task.id !== id;
  });

  res.render("index.ejs", {
    tasks,
  });
});

app.post("/complete", (req, res) => {
  const { id } = req.body;

  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        complete: task.complete ? false : true,
      };
    }
    return task;
  });

  res.render("index.ejs", {
    tasks,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
