const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);

      res.status(200).send("Created Skill");
    } catch (error) {
      res.status(500).send({ message: `Error while creating Skill: ${error}` });
    }
  },
  read: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).find();

      res.status(200).send("Skills list");
    } catch (error) {
      res.status(500).send({ message: `Error while getting Skill: ${error}` });
    }
  },
  update: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).update(req.body.id, req.body.newData);

      res.status(200).send("Skill Updated");
    } catch (error) {
      res.status(500).send({ message: `Error while updating Skill: ${error}` });
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).delete(req.body);

      res.status(200).send("Skill Deleted");
    } catch (error) {
      res.status(500).send({ message: `Error while deleting Skill: ${error}` });
    }
  },
};
