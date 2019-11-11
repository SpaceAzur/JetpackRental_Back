const Jetpack = require("../../src/Entity/Jetpack");
const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository.js');

module.exports = (req, res) => {
  let jetpack = new Jetpack();
  jetpack.id = req.params.id;
  jetpack.image = req.body.image;
  jetpack.name = req.body.name;

  console.log("Mise a jour jetpack: " + jetpack.id);

  const repository = new JetpackRepository(db);
  try {
    repository.updateJetpack(jetpack);
    res.status(200).send(jetpack.toJson());
  } catch (e) {
    res.status(424).send(e);
  }
};
