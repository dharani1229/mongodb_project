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

let updateProduct = async(req, res, next)=>{
    try{
        let id= req.params.id
        console.log(id)
        let data = await productModel.findById(id)
             data.sellingPrice = req.body.sellingPrice;
             console.log(data)
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

module.exports = {
    addProduct,
    updateProduct
}