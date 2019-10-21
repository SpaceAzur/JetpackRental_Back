const Booking = require("../../src/Entity/booking");
const uuidv4 = require('uuid/v4');
const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/bookingRepository');

module.exports = (req, res) => {
  console.log("Creation booking: " + req.body);
  let booking = new Booking();
  booking.id = uuidv4();
  booking.jetpackId = req.body.jetpackId;
  booking.start_date = req.body.start_date;
  booking.end_date = req.body.end_date;

  const repository = new BookingRepository(db);
  repository.create(booking);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(201).send(booking.toJson())
};
