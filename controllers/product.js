const productModel = require("../models/product")



let addProduct = async ( req, res , next )=>{
   
    try{
       const product = new productModel({
        productName: req.body.productName,
        modelName: req.body.modelName,
        mrp : req.body.mrp,
        sellingPrice: req.body.sellingPrice,
        soldPrice: req.body.soldPrice
       })

       await product.save();
       res.status(200).send({
        message: "product create successfully ",
        product : product

       })
}
catch(error){
    console.log(error)
    res.status(500).send("someThing went wrong ")
}
}

module.exports = {
    addProduct
}