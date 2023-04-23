const express = require("express")
const router = express.Router();
const booking = require("../controllers/booking")
const validation = require("../middleware/userAuthenticate")

router.post("/",validation, booking.booking)

module.exports = router;