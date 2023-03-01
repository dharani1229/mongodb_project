const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const userRouter = require('./routers/authRouter');
const productRouter  = require("./routers/productRouter")
const cors = require("cors");

const app = express();

var corsOptions = {
    origin : "http://localhost:9000"
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(userRouter)
app.use(productRouter)

const port = process.env.port || 9000;

mongoose.connect("mongodb://localhost/userLogingDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false

}).then(()=>console.log("database is connected successfully........"))
.catch((error)=>console.log("DateBase connection error : ",error))

app.listen(port,()=>console.log("server running successfully ............"))