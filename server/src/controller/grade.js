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

      res.send("Created Grade");
    } catch (error) {
      res.send("Error while creating Grade:", error);
    }
  },
  read: async (req, res) => {
    try {
      const gradeFromDB = await dataSource.getRepository(Grade).find();

      res.send(gradeFromDB);
    } catch (error) {
      res.send("Error while getting Grades");
    }
  },
  //   update: async (req, res) => {
  //     try {
  //       await dataSource.getRepository(Grade).update(req.body.id, req.body.newData);

  //       res.send("Grade Updated");
  //     } catch (error) {
  //       res.send("Error while deleting Grade");
  //     }
  //   },
  //   delete: (req, res) => {
  //     try {
  //       dataSource.getRepository(Grade).delete(req.body);

  //       res.send("Grade Deleted");
  //     } catch (error) {
  //       res.send("Error while deleting Grade");
  //     }
  //   },
};
