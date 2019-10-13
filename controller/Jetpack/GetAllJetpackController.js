const Jetpack = require("../../src/Entity/Jetpack");
const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');

module.exports = (req, res) => {
    const id = req.params.id;
    let jetpackRepository = new JetpackRepository();
    let result = jetpackRepository.getAll(db)
    res.send(result);
};