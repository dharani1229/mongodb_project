const userModel = require("../models/userLogin")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
//const cookie = require("cookie-parser")
const { use } = require("../routers/productRouter");
const secretKey = require("../config/authKey")



// REGISTER
let register = async (req, res, next) => {
    try {
        const { name, email, password, phonenumber, GSTnumber, pancard, DOb } = req.body;
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const getSalt = await bcrypt.genSaltSync(10)

        const hashedPassword = await bcrypt.hashSync(password, getSalt)

        const newUser = new userModel({ name, email, password: hashedPassword, phonenumber, GSTnumber, pancard, DOb });

        
            const user=  {
                id: newUser.id
            }

        let tocken = jwt.sign(user, secretKey);

        await newUser.save((error) => {
            if (error) {
                console.log(error)
            }

        })

        res.status(201).json({
            message: 'User created successfully',
            data: newUser,
            token: tocken
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}








// USERLOGIN

let userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("eamil", email, "password", password)
        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).send({
                message: "<<  entered wrong email >>"
            })
        }

        const existingUserPassword = await bcrypt.compare(password, existingUser.password);

        if (!existingUserPassword) {
            res.status(400).send({
                message: "<<< password is not matched  >>>"

            })
        }

        const tocken = jwt.sign({ urlId: existingUser._id, email: existingUser.email }, secretKey)
        console.log("tocken --------->", tocken)

        res.cookie("token", tocken)
        existingUser.tocken = tocken

        await existingUser.save()

        res.status(200).send({
            message: "userSuccessfully loging ",
            tocken: tocken,
        })
    }
    catch (error) {
        res.status(500).send({
            message: "something went wrong ",
            error: error
        })
    }
}

let getusers = async (req, res, next) => {
    try {
         
          let email = req.body.email;
          let findUsers = await userModel.findOne({email: email})
          console.log(findUsers)

        // let allusers = await userlogin.findOne()
        res.status(200).send({
            message: "got all users",
            users:  "get user successfully",
           allUsers : findUsers
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).send({
            message: "error in the get users",
            error: error
        })
    }
}




let dropUser = async (req, res, next) => {
    try {
        //let email = req.params
        let findUser = await userlogin.findByIdAndDelete(req.params.id)
        allUsers = await userModel.find()
        res.status(200).send({
            message: " good result",
            result: allUsers
        })
    }
    catch (error) {
        res.send(error)
    }
}
// UPDATE USER-------
let updateUser = async (req, res, next) => {
    try {
        let { id } = req.params
        let findUser = await userModel.findOneAndUpdate({ id: id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    phonenumber: req.body.phonenumber,
                    GSTnumber: req.body.GSTnumber,
                    pancard: req.body.pancard,
                    DOb: req.body.DOb
                }
            }
        )

        res.status(200).send({
            message: "good job",
            result: user
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "user not updated someing went wrong",
            error: error
        })
    }
}

 

module.exports = {
    register,
    userLogin,
    getusers,
    dropUser,
    updateUser,
   
}