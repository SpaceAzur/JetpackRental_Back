const Booking = require("../../src/Entity/booking");
const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/bookingRepository');

module.exports = (req, res) => {
  let booking = new Booking();
  booking.id = req.params.id;
  booking.jetpackId = req.body.jetpackId;
  booking.start_date = req.body.start_date;
  booking.end_date = req.body.end_date;

  console.log("Mise a jour booking: " + id_booking);

  const repository = new BookingRepository(db);
  try {
    repository.updateBooking(booking);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(booking.toJson());
  } catch (e) {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(424).send(e);
  }
};
