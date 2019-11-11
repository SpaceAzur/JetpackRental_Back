const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository.js');

module.exports = (req, res) => {
  let id_jetpack = req.params.id;
  console.log("Suppression booking: " + id_jetpack);

  const repository = new JetpackRepository(db);
  repository.updateJetpack(id_jetpack);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(501).send();
};
