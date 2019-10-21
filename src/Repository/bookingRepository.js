module.exports = class {
  constructor(db) {
    this.db = db;
  }

  create(booking){}

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
