const BookingRepository = require('../Repository/bookingRepository');

module.exports = class {
  constructor(db) {
      this.db = db;
  }

  create(jetpack) {
      if (!jetpack) {
          throw 'Jetpack object is undefined';
      }

      if (!jetpack.id || !jetpack.name) {
          throw 'Jetpack object is missing information';
      }

      this.db
          .get('jetpacks')
          .push(jetpack.toJson())
          .write()
  }

  getAll() {
    return this.db.get('jetpacks').value();
  }

  getJetpackById(idToSearch){
    if(idToSearch) {
      return this.db
        .get('jetpacks')
        .find(({id: idToSearch}))
        .value();
    } else {
      throw ('Unable to search empty jetpack ID');
    }
  }

  getJetpacksAvailable(from, to){
    if (from && to) {
      let start_date = new Date(from);
      let end_date = new Date(to);

      if (start_date.getTime() <= end_date.getTime()){
        let repository = new BookingRepository(this.db);
        let jetpacksAvailable = [];
        this.db.get('jetpacks')
          .value()
          .forEach(jetpack => {
            if (repository.isJetpackAvailable(jetpack.id, from, to)){
              jetpacksAvailable.push(jetpack)
            }
          });

        return jetpacksAvailable;

      } else {
        throw 'The end date cannot be anterior to start date!';
      }
    } else {
      return null;
    }
  }
};
