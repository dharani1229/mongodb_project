const express = require('express')
const router = express.Router();
const productController = require("../controllers/product")
const verification = require("../middleware/userAuthenticate")

router.post("/addProduct",verification, productController.addProduct)
router.put("/updateProduct/:id",verification,productController.updateProduct)
router.get("/getProductData",productController.productDetails)

module.exports = router;