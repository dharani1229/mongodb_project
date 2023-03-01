const express = require('express')
const router = express.Router();
const authController = require("../controllers/authUserController")




router.post("/adduser", authController.register)
router.post("/userLogin", authController.userLogin)
router.get("/getAllUsers",authController.getusers)
router.delete("/dropUser/:id",authController.dropUser)
router.put("/updateUser/:id",authController.updateUser)
router.patch("/UPDATE/:id", authController.patchUser)



module.exports = router;