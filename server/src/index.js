const express = require("express");
const cors = require("cors");
const dataSource = require("./utils").dataSource;
const WilderController = require("./controller/wilder");
const SkillController = require("./controller/skill");
const GradeController = require("./controller/grade");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder", WilderController.create);
app.get("/api/wilder", WilderController.read);
app.put("/api/wilder", WilderController.update);
app.delete("/api/wilder", WilderController.delete);

app.post("/api/skill", SkillController.create);
app.get("/api/skill", SkillController.read);
app.put("/api/skill", SkillController.update);
app.delete("/api/skill", SkillController.delete);

app.get("/api/grade", GradeController.read);
app.post("/api/grade", GradeController.create);

const start = async () => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server started on 5000"));
};

//Start Server
start();
