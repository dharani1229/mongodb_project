const express = require('express')
const router = express.Router();
const authController = require("../controllers/authUserController")
const verification = require("../middleware/userAuthenticate")


router.post("/adduser", authController.register)
router.post("/userLogin", authController.userLogin)
router.get("/getAllUsers",verification, authController.getusers)
router.delete("/dropUser/:id",authController.dropUser)
router.put("/updateUser/:id",authController.updateUser)




module.exports = router;