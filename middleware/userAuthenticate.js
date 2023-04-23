const jwt = require("jsonwebtoken");
const secretKey = require("../config/authKey")

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      res.send({
        message: "unauthorized"
      })
    }
    validToken = token.split(" ")[1]
   
    if (!validToken) {
      return res.status(401).json({ message: "give proper tocken " });
    }
    const decoded = await jwt.verify(validToken, secretKey);
  
    next();

  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: "<< tocken server error >>" });
  }
};


