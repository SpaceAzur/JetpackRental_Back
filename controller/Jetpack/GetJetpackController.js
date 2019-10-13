const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
  var my_id = req.params.id;

  //console.log('id ' + my_id);
  if (my_id === undefined){
    console.log('Recuperation de la liste des jetpacks')
    const repository = new JetpackRepository(db);
    let jetpacks = repository.getAll();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(jetpacks)
  } else {
    console.log('Recuperation jetpack id: ' + my_id);
    const repository = new JetpackRepository(db);
    let jetpack = repository.getJetpackById(my_id);
    res.status(200).send(jetpack)
  }

};
