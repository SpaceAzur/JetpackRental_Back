const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
  let id_jetpack = req.params.id;
  console.log("Suppression jetpack: " + id_jetpack);

  const repository = new JetpackRepository(db);
  try {
    repository.deleteJetpack(id_jetpack);
    res.status(200).send();
  } catch (e) {
    res.status(424).send(e);
  }

};
