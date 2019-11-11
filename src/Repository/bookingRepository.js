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

    if(this.isJetpackAvailable(booking.jetpackId, booking.start_date, booking.end_date)) {
      this.db
        .get('bookings')
        .push(booking.toJson())
        .write()
    } else {
      throw 'Jetpack not available on this period';
    }
  }

  getAllBookings(){
    return this.db
      .get('bookings')
      .value();
  }

  getBookingById(idToSearch){
    if(!idToSearch){
      throw "id is missing";
    }
    let currentBooking = this.db
      .get('bookings')
      .find(({id: idToSearch}))
      .value();

    if(currentBooking !== null || currentBooking !== undefined) {
      return currentBooking;
    }
  }

  // getBookingById2(idToSearch){
  //   if(idToSearch) {
  //     return this.db
  //     .get('bookings')
  //     .find(({id: idToSearch}))
  //     .value();
  //   } else {
  //     throw "this booking doesn't exist";
  //   }
  // }

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

  
  bookingContainsJetpack(idJetpack){
    let booking_containing_jetpack = this.db.get('bookings')
      .find(({jetpackId: idJetpack}))
      .value();

    return booking_containing_jetpack !== undefined;
  }

  updateBooking(Booking){
    if (!Booking) {
      throw 'Booking object is undefined';
    }

    let idBooking = Booking.id;
    let idJetpack = Booking.jetpackId;
    let startDate = Booking.start_date;
    let endDate = Booking.end_date;

    // tester existence des parametres du Booking
    if(!idBooking ||
      !idJetpack ||
      !startDate ||
      !endDate
    ) {
      throw "Booking data is missing, can't update the booking";
    }

    // On met a jour le booking dans la BD si le jetpack est disponible aux dates sélectionnées
    if (this.isJetpackAvailable(idJetpack, startDate, endDate)) {
      this.db.get('bookings')
        .find({id: idBooking})
        .assign({jetpackId: idJetpack, start_date: startDate, end_date: endDate})
        .write()
    } else {
      throw 'Jetpack not available on this period';
    }
  }

  deleteBooking(idBooking){
    if(idBooking !== undefined) {
      let existingBooking = this.db.get('bookings')
        .find(({id: idBooking}))
        .value();

      if(existingBooking !== undefined){
        this.db.get('bookings')
          .remove(({id: idBooking}))
          .write();
      } else {
        throw 'Unable to delete an unknown booking';
      }
    } else {
      throw 'Unable to delete a booking whithout id';
    }
  }

};
