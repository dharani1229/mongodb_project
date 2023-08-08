const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const userRouter = require('./routers/user');
const productRouter  = require("./routers/product")
const booking = require("./routers/booking")
const cors = require("cors");

const app = express();

var corsOptions = {
    origin : "http://localhost:5000"
   //origin:"http//3.110.113.232/rockmongo-php7"
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(userRouter)
app.use(productRouter)
app.use(booking)

const port = process.env.port || 5000;


//mongodb://localhost/Vbooking
//"mongodb+srv://vbooking:vbooking@cluster0.fqavivz.mongodb.net/test"
mongoose.connect("mongodb://localhost/Vbooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("dataBase is connected") })
    .catch(error => {
        console.log(error)
    })

app.listen(port,()=>console.log("server running successfully ............"))