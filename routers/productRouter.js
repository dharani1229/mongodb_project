const express = require('express')
const router = express.Router();
const productController = require("../controllers/product")

router.post("/addProduct", productController.addProduct )
router.put("/updateProduct/:id",productController.updateProduct)

module.exports = router;