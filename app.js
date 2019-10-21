const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//.route('/jetpacks/:id?')
app.get('/jetpacks/:id?', require('./controller/Jetpack/GetJetpackController'));
app.post('/jetpacks/create', require('./controller/Jetpack/CreateJetpackController'));

app.get('/bookings/:id?', require('./controller/Booking/GetBookingController'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
