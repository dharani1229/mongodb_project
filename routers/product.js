const express = require('express')
const router = express.Router();
const productController = require("../controllers/product")
const verification = require("../middleware/userAuthenticate")

router.post("/addProduct",verification, productController.addProduct)
router.put("/updateProduct/:id",verification,productController.updateProduct)
router.get("/getProductData/:id",productController.productDetails)

module.exports = router;
//http://localhost:5000/getProductData/
// {"productName": "a",
//         "modelName": "a",
//         "mrp": "2",
//         "sellingPrice":"2",
//         "sellingPriceDate":"132",
//         "soldPrice":""}