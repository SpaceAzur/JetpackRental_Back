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
      throw 'You have to choose start and end dates';
    }
  }

  updateJetpack(Jetpack){
    if (!Jetpack) {
      throw 'Jetpack object is undefined';
    }

    let idJetpack = Jetpack.id;
    let jetName = Jetpack.name;
    let jetImage = Jetpack.image;

    // tester existence des parametres du jetpack
    if(!idJetpack ||
      !jetName ||
      !jetImage
    ) {
      throw "Jetpack data is missing, can't update the jetpack";
    }

    // On met a jour le jetpack dans la BD
    this.db.get('jetpacks')
      .find({id: idJetpack})
      .assign({ image: jetImage, name: jetName})
      .write()
  }

  deleteJetpack(idJetpack){
    if(idJetpack !== undefined) {
      let existingJetpack = this.db.get('jetpacks')
        .find(({id: idJetpack}))
        .value();

      if(existingJetpack !== undefined){
        // On verifie que le jetpack n'est pas contenu dans un booking
        let repository = new BookingRepository(this.db);
        if(!repository.bookingContainsJetpack(idJetpack)) {
          this.db.get('jetpacks')
            .remove(({id: idJetpack}))
            .write();
        } else {
          throw 'A jetpack booked can\'t be delete. Delete the booking before'
        }
      } else {
        throw 'Unable to delete an unknown jetpack';
      }
    } else {
      throw 'Unable to delete a jetpack whithout id';
    }
  }
};
