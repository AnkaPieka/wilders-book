const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");
const Grades = require("../entity/Grade");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);

      res.status(200).send("Created Wilder");
    } catch (error) {
      res.status(200).send({ message: `Error while creating wilder: ${error}` });
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

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({ message: `Error while getting wilder: ${error}` });
    }
  },
  update: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).update(req.body.id, req.body.newData);

      res.status(200).send({ message: "Wilder Updated" });
    } catch (error) {
      res.status(500).send({ message: `Error while updating wilder: ${error}` });
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Grades).delete(req.body);
      await dataSource.getRepository(Wilder).delete(req.body);

      res.status(200).send({ message: `Deleted successfully` });
    } catch (error) {
      res.status(500).send({ message: `Error while deleting wilder: ${error}` });
    }
  },
};
