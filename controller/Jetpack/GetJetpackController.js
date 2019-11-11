const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
  let my_id = req.params.id;

  let startDate = req.params.start_date;
  let endDate = req.params.end_date;

  // Pour utiliser les parametres definis par un ? dans l'URL
  //let my_id = req.query.id;

  //console.log('id ' + my_id);
  if (my_id === undefined &&
      startDate === undefined &&
      endDate === undefined
  ){
    console.log('Recuperation de la liste des jetpacks')
    const repository = new JetpackRepository(db);
    let jetpacks = repository.getAll();
    res.status(200).send(jetpacks);

  } else if (my_id === undefined &&
            startDate &&
            endDate
  ) {
    console.log("Verification de la disponibilité des jetpacks " +
      "sur la periode du " + startDate + " au " + endDate);

    const repository = new JetpackRepository(db);
    try {
      let jetpacksAvailable = repository.getJetpacksAvailable(startDate, endDate);
      res.status(200).send(jetpacksAvailable);
    } catch (e) {
      res.status(424).send(e);
    }

  } else {
    console.log('Recuperation jetpack id: ' + my_id);
    const repository = new JetpackRepository(db);
    try {
      let jetpack = repository.getJetpackById(my_id);
      res.status(200).send(jetpack)
    } catch (e) {
      res.status(424).send(e)
    }
  }

};
