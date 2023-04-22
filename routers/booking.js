const express = require("express")
const router = express.Router();
const booking = require("../controllers/booking")

router.post("/", booking.booking)

module.exports = router;