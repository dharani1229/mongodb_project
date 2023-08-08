const productModel = require("../models/product")

// let addProduct = async(req, res, next) => {
//     try {
//         let product = new productModel({
//             productName: req.body.productName || " ",
//             modelName: req.body.modelName || " ",
//             mrp: req.body.mrp || " ",
//             sellingPrice: req.body.sellingPrice || " ",
//             sellingPriceDate: req.body.sellingPriceDate || " ",
//             soldPrice: req.body.soldPrice || " "
//         })
       
//         await product.save()
//         res.status(200).send({
//             message: "product create successfully ",
//             product: product})
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).send({
//             message: "server error",
//             error:error
//         })
//     }
// }
let addProduct = async (req, res) => {
    try {
      let { productName, productId, modelName, mrp, sellingPrice, quantity } =
        req.body;
  
      const findProduct = await productModel.find({ productId: productId });
  
      console.log(findProduct);
  
      if (findProduct.length != 0) {
        res.status(400).send({
          message: "prodct already found ",
        });
      } else {
        let product = new productModel({
          productName: productName,
          productId: productId,
          modelName: modelName,
          mrp: mrp,
          quantity: quantity,
          sellingPrice: sellingPrice,
        });
        await product.save();
  
        res.status(200).send({
          message: "product create successfully ",
          product: product,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "server error",
        error: error.message,
      });
    }
  };

let updateProduct = async (req, res, next) => {
    try {
        let id = req.params.id
        console.log(id)
        let data = await productModel.findById(id)
        data.sellingPrice = req.body.sellingPrice;
        data.sellingPriceDate = req.body.sellingPriceDate;
        //  console.log(data)
        await data.save()
        res.status(200).send({
            message: "==========",
            result: data
        })
    }
    catch (error) {
        res.status(500).send({
            message: "something wrong in data updating ....",
            error: error

        })
    }
}



let productDetails = async (req, res, next) => {

    try {
        let id = req.params.id;
        let productData = await productModel.findById({_id:id})
        res.status(200).send({
            message: " successfully product finded",
            Details: productData
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "server error",
            error:error
        })
    }
}


module.exports = {
    addProduct,
    updateProduct,
    productDetails
}