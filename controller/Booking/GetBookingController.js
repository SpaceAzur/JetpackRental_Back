const  Booking = require("../../src/Entity/booking");
const uuidv4 = require('uuid/v4');
const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/bookingRepository');

module.exports = (req, res) => {
  // Recuperation des parametres
  let id_booking = req.params.id;

  //Pas d'id en parametre => On affiche la liste des reservations
  if(id_booking === undefined){
    console.log('Recuperation de la liste des bookings');
    const repo = new BookingRepository(db);
    let bookings = repo.getAllBookings();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(bookings)

  } else {
    console.log('Recuperation booking id: ' + id_booking);
    const repo = new BookingRepository(db);
    let booking = repo.getBookingById(id_booking);
    res.status(200).send(booking);
  }
};
