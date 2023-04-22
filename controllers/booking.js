const bookingModel = require("../models/booking")

let booking = async (req, res, next )=>{
    try{
        const booking = new bookingModel({
           names : req.body
        })
        await booking.save();
        res.status(200).send({
            message: "booking successfully"
        })

    }
    catch(error){
        console.log({message: error})
    }
}

module.exports ={ booking};