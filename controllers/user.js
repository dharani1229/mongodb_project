const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
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

        await newUser.save((error) => {
            if (error) {
                console.log(error)
            }

        })

        res.status(201).json({
            message: 'User created successfully'
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
        let findUser = await userModel.findOne({ email: email })

        res.status(200).send({
            message: "User Data",
            userName: findUser.name,
            email: findUser.email,
            phoneNumber: findUser.phonenumber

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
        let id = req.params.id
        console.log(id)
        let findUser = await userModel.findByIdAndRemove({_id:id})
    
        res.status(200).send({
            message: " user Deleter",
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "server error",
            error: error
        })
    }
}
// UPDATE USER-------
let updateUser = async (req, res, next) => {
    try {
        let id = req.params.id
        console.log(id)
        let findUser = await userModel.findById({ _id: id })
        console.log(findUser)
        await findUser.updateOne({

            name: req.body.name || findUser.name,
            email: req.body.email || findUser.email,
            password: req.body.password || findUser.password,
            phonenumber: req.body.phonenumber || findUser.phonenumber,
            GSTnumber: req.body.GSTnumber || findUser.GSTnumber,
            pancard: req.body.pancard || findUser.pancard,
            DOb: req.body.DOb || findUser.DOb
        })

        await findUser.save()

        res.status(200).send({
            message: "user updated"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "server error",
            error: error
        })
    }
}



module.exports = {
    register,
    userLogin,
    getusers,
    dropUser,
    updateUser
}