const express = require('express');
const bodyParser = require('body-parser');
let app = express();
// let router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


// app
//     .route('/jetpacks/:id')
//     .get(require('./controller/Jetpack/GetJetpackController'))
//     .post(require('./controller/Jetpack/CreateJetpackController'))

// app.get('/jetpacks/:id', require('./controller/Jetpack/GetJetpackController'));


app.get('/jetpacks/:id', require('./controller/Jetpack/GetJetpackController'));

app.get('/jetpacks/', require('./controller/Jetpack/GetAllJetpackController'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});