const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
  console.log("params: ",req.query);

  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  if (startDate === undefined &&
    endDate === undefined
  ){
    console.log('Recuperation de la liste des jetpacks');
    const repository = new JetpackRepository(db);
    const jetpacks = repository.getAll();
    res.status(200).send(jetpacks);

  } else if (startDate &&
    endDate
  ) {
    console.log("Verification de la disponibilité des jetpacks " +
      "sur la periode du " + startDate + " au " + endDate);

    const repository = new JetpackRepository(db);
    try {
      const jetpacksAvailable = repository.getJetpacksAvailable(startDate, endDate);
      res.status(200).send(jetpacksAvailable);
    } catch (e) {
      res.status(424).send(e);
    }
  }
};
