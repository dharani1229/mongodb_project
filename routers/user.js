const express = require('express')
const router = express.Router();
const authController = require("../controllers/user")
const verification = require("../middleware/userAuthenticate")


router.post("/userRegister", authController.register)
router.post("/userLogin", authController.userLogin)
router.get("/getUser",verification, authController.getusers)
router.delete("/dropUser/:id",authController.dropUser)
router.put("/updateUser/:id",authController.updateUser)




module.exports = router;