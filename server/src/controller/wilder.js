const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");
const Grades = require("../entity/Grade");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);

      res.send("Created Wilder");
    } catch (error) {
      res.send("Error while creating wilder");
    }
  },
  read: async (req, res) => {
    try {
      const grades = await dataSource.getRepository(Grades).find();

      const wilders = await dataSource.getRepository(Wilder).find();

      const data = wilders.map((wilder) => {
        const wilderGrades = grades.filter((grade) => grade.wilder.id === wilder.id);

        const wilderGradesLean = wilderGrades.map((el) => {
          return { title: el.skill.name, votes: el.grade };
        });

        const result = {
          ...wilder,
          skills: wilderGradesLean,
        };

        return result;
      });

      res.send(data);
    } catch (error) {
      res.send("Error while getting wilders!");
    }
  },
  update: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).update(req.body.id, req.body.newData);

      res.send("Wilder Updated");
    } catch (error) {
      res.send("Error while updating wilder:", error);
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Grades).delete(req.body);
      await dataSource.getRepository(Wilder).delete(req.body);

      res.send("Wilder & associated Grade Deleted");
    } catch (error) {
      res.send("Error while deleting wilder", error);
    }
  },
};
