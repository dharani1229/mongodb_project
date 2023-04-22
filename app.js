const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const userRouter = require('./routers/authRouter');
const productRouter  = require("./routers/productRouter")
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

mongoose.connect("mongodb://localhost/userLogingDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false

}).then(()=>console.log("database is connected successfully........"))
.catch((error)=>console.log("DateBase connection error : ",error))

app.listen(port,()=>console.log("server running successfully ............"))