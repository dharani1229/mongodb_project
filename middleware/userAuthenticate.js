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
    //console.log(validTocken)
    //console.log("-------------", tocken)
    //console.log(typeof tocken)
    if (!validToken) {
      return res.status(401).json({ message: "give proper tocken " });
    }
    const decoded = await jwt.verify(validToken, secretKey);
    //req.user = decoded.user;
    // console.log("--------------------->get user Data from the tocken", decoded )
    next();

  }
  catch (e) {
    console.error(e);
    res.status(500).send({ message: "<< tocken server error >>" });
  }
};

// module.exports = async (req, res, next) => {
//   try {
//     const getTocken = req.headers["Authorization"]
//     console.log("TOCKENVERIFY   :  " ,getTocken.user)
//    // const tocken = getTocken.split(' ')[1];
//     if (!getTocken) {
//       return res.status(401).json({ message: "Auth Error" });
//     }
//     const decoded = jwt.verify(getTocken, secretKey);
//     if(!decoded){
//       res.send("<< tocken is not verify >>")
//     }

//     next();
//   }
//   catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Invalid Token" });
//   }
// }
