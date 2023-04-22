const productModel = require("../models/product")



let addProduct = async ( req, res , next )=>{
   
    try{
       const product = new productModel({
        productName: req.body.productName,
        modelName: req.body.modelName,
        mrp : req.body.mrp,
        sellingPrice: req.body.sellingPrice,
        sellingPriceDate: req.body.sellingPriceDate,
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
    res.status(500).send("add product properlly ... ")
}
}

let updateProduct = async(req, res, next)=>{
    try{
        let id= req.params.id
        console.log(id)
        let data = await productModel.findById(id)
             data.sellingPrice = req.body.sellingPrice;
             data.sellingPriceDate = req.body.sellingPriceDate;
           //  console.log(data)
         await data.save()
            res.status(200).send({
                message: "==========",
                result : data
            })
    }
    catch(error){
        res.status(500).send({
            message:"something wrong in data updating ....",
            error: error

        })
    }
}



let productDetails = async(req , res , next )=>{

    try{
        let id= req.body.id;
        console.log(id)
        let productData = await productModel.findById(id)
        res.status(200).send({
            message: " successfully product finded",
            Details: productData
        })
    }
    catch(error){
        console.log(error)
    }
}


module.exports = {
    addProduct,
    updateProduct,
    productDetails
}