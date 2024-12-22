var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var productControllerClass = require('./productController');
var productController = new productControllerClass();


app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
    //Test Connect
    // productController.connectToDB();
    // .then((db) => {
    //     res.send('connection establisthed');
    //     res.send(db.collection('post').find());
    // })
    //     .catch((err) => {
    //         res.sendStatus(500).send(err);
    //     });
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/getProducts', function (req, res) {
    productController.getAllProducts().then((data) => {
        res.status(200).json(data);
    });
});

app.get('/add', function (req, res) {
    res.sendFile(__dirname + "/" + "addProduct.html");
});
app.post('/insert', function (req, res) {
    console.log('now')
    console.log('insert', JSON.stringify(req.body));
    let newPrd = JSON.stringify(req.body);
    productController.insertProduct(newPrd)
        .then(() => {
            console.log('Inserted');
            res.redirect('/');
        });
});

app.listen(3000, function () {
    console.log("Example app listening... ");
});