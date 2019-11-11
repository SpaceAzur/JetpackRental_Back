const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
  let id_jetpack = req.params.id;
  console.log("Suppression booking: " + id_jetpack);

  const repository = new JetpackRepository(db);
  repository.deleteJetpack(id_jetpack);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send();
};
