const bookingModel = require("../models/booking")
const productModel = require("../models/product")

// let booking = async (req, res, next )=>{
//     try{
//         const booking = new bookingModel({
//            names : req.body
//         })
//         await booking.save();
//         res.status(200).send({
//             message: "booking successfully",
//             booking: booking.names
//         })

//     }
//     catch(error){
//         console.log({message: error})
//     }
// }
let booking = async (req, res) => {
    try {
      let { productId, soldPrice, quantity } = req.body;
  
      const findProduct = await productModel.findOne({ productId: productId });
  
      if (!findProduct) {
        res.status(400).send({
          message: "Product not found",
        });
      } else {
        const remainingQuantity = findProduct.quantity - quantity;
        let status = 0; // Not sold
  
        if (remainingQuantity === 0) {
          status = 1; // Fully sold
        } else if (remainingQuantity > 0 && remainingQuantity < findProduct.quantity) {
          status = 2; // Partially sold
        }
  
        // Update the booking status
        const booking = new bookingModel({
          productId: productId,
          quantitySold: quantity,
        });
        await booking.save();
  
        // Update the product status and soldPrice
        await productModel.updateOne(
          { productId: productId },
          {
            soldPrice: soldPrice,
            status: status,
          }
        );
  
        res.status(200).send({
          message: "Booking successful",
          booking,
          status,
        });
      }
    } catch (error) {
      console.log({ message: error });
      res.status(400).send({
        message: error.message,
      });
    }
  };


  
  
      

module.exports ={ booking};