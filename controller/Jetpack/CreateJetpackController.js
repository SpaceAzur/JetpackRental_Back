const Jetpack = require("../../src/Entity/Jetpack");
const uuidv4 = require('uuid/v4');
const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
    console.log(req.body);
    let jetpack = new Jetpack();
    jetpack.id = uuidv4();
    jetpack.name = req.body.name;
    jetpack.image = req.body.image;

    const repository = new JetpackRepository(db);
    try {
      repository.create(jetpack);
      res.header("Access-Control-Allow-Origin", "*");
      res.status(201).send(jetpack.toJson());
    } catch (e) {
      res.header("Access-Control-Allow-Origin", "*");
      res.status(424).send(e);
    }
};
