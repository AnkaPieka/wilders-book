const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);

      res.send("Created Skill");
    } catch (error) {
      res.send("Error while creating Skill");
    }
  },
  read: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).find();

      res.send("Skills list");
    } catch (error) {
      res.send("Error while getting Skills");
    }
  },
  update: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).update(req.body.id, req.body.newData);

      res.send("Skill Updated");
    } catch (error) {
      res.send("Error while deleting Skill");
    }
  },
  delete: (req, res) => {
    try {
      dataSource.getRepository(Skill).delete(req.body);

      res.send("Skill Deleted");
    } catch (error) {
      res.send("Error while deleting Skill");
    }
  },
};
