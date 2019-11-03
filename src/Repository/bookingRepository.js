module.exports = class {
  constructor(db) {
    this.db = db;
  }

  create(booking){
    if (!booking) {
      throw 'Booking object is undefined';
    }

    if (
      !booking.id ||
      !booking.jetpackId ||
      !booking.start_date ||
      !booking.end_date
    ) {
      throw 'Booking object is missing information';
    }

    this.db
      .get('bookings')
      .push(booking.toJson())
      .write()
  }

  getAllBookings(){
    return this.db
      .get('bookings')
      .value();
  }

  getBookingById(idToSearch){}

  isJetpackAvailable(idJetpack, from, to){
    if(idJetpack !== undefined) {
      //console.log("Recherche du jetpack " + idJetpack);
      // On recherche l'id du jetpack dans les bookings
      let booking_containing_jetpack = this.db.get('bookings')
        .find(({jetpackId: idJetpack}))
        .value();

      //console.log("booking_containing_jetpack: " + booking_containing_jetpack);

      // Si on le trouve, on regarde si les dates de dispo s'overlapsent avec le booking déjà existant
      // Si oui, alors il n'est pas dispo aux dates demandées, on retourne false
      // Si non, il est dispo, on retourne true
      if(booking_containing_jetpack !== undefined) {
        return !this.overlaps(
          booking_containing_jetpack.start_date, booking_containing_jetpack.end_date,
          from, to
        );
      } else {
        // Si le jetpack n'apparait dans aucune reservation, il est disponible
        return true;
      }
    } else {
      throw 'Unable to search a jetpack in bookings whithout id';
    }
  }

  /**
   * Exemple 1 : Chevauchement des intervalles
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      overlaps(interval1, interval2) => true
   *
   *      interval1 =                                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      overlaps(interval1, interval2) => true
   *
   *      interval1 =                                   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      overlaps(interval1, interval2) => true
   * Exemple 2 : Intervalles indépendants
   *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      interval2 =                                                       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   *      overlaps(interval1, interval2) => false
   *
   * @param {Interval} interval
   * @returns {boolean}
   */
  overlaps(from_date_1, to_date_1, from_date_2, to_date_2) {
    let from1 = new Date(from_date_1);
    let to1 = new Date(to_date_1);
    let from2 = new Date(from_date_2);
    let to2 = new Date(to_date_2);

    return to1 > from2 && from1 < to2;
  }

  updateBooking(idBooking){}

  deleteBooking(idBooking){}

};
