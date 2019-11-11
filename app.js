const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//.route('/jetpacks/:id?')
// Jetpacks
// GET pour récupérer la liste des Jetpacks
app.get('/jetpacks', require('./controller/Jetpack/GetJetpackController'));
// POST pour créer un jetpack
app.post('/jetpacks/', require('./controller/Jetpack/CreateJetpackController'));
// PUT pour mettre a jour un jetpack
app.put('/jetpacks/:id', require('./controller/Jetpack/UpdateJetpackController'));
// DELETE pour supprimer un jetpack
app.delete('/jetpacks/:id', require('./controller/Jetpack/DeleteJetpackController'));

// Bookings
// GET pour récupérer la liste des bookings
app.get('/bookings/:id?', require('./controller/Booking/GetBookingController'));
app.post('/bookings/', require('./controller/Booking/CreateBookingController'));
app.delete('/bookings/:id', require('./controller/Booking/DeleteBookingController'));
app.put('/bookings/:id', require('./controller/Booking/UpdateBookingController'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
