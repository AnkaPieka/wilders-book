const dataSource = require("../utils").dataSource;
const Grade = require("../entity/Grade");
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      const wilderFromDB = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilder });

      console.log(wilderFromDB);

      const skillFromDB = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skill });

      await dataSource
        .getRepository(Grade)
        .save({ grade: req.body.grade, skill: skillFromDB, wilder: wilderFromDB });

      res.status(200).send("Created Grade");
    } catch (error) {
      res.status(500).send({ message: `Error while creating grade: ${error}` });
    }
  },
  read: async (req, res) => {
    try {
      const gradeFromDB = await dataSource.getRepository(Grade).find();

      res.status(200).send(gradeFromDB);
    } catch (error) {
      res.status(500).send({ message: `Error while updating wilder: ${error}` });
    }
  },
  // delete: async (req, res) => {
  //   try {
  //     await dataSource.getRepository(Grade).delete(req.params.id);

  //     res.status(200).send("Grade Deleted");
  //   } catch (error) {
  //     res.status(500).send({ message: `Error while deleting grade: ${error}` });
  //   }
  // },
};
