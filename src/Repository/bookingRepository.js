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

  isJetpackAvailable(idJetpack, from, to){}

  updateBooking(idBooking){}

  deleteBooking(idBooking){}

};
