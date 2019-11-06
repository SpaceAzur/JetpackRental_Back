const Booking = require("../../src/Entity/booking");
const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/bookingRepository');

module.exports = (req, res) => {
  let id_booking = req.params.id;
  console.log("Suppression booking: " + id_booking);

  const repository = new BookingRepository(db);
  repository.deleteBooking(id_booking);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send();
};
