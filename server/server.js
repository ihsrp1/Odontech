const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

(function main () {
})();



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})