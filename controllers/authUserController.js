const userlogin = require("../models/userLogin")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

let register = async  (req, res, next ) => {
    try {
        const { name, email, password, phonenumber,GSTnumber,pancard,DOb} = req.body;
        const existingUser = await userlogin.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userlogin({ name, email, password: hashedPassword,phonenumber,GSTnumber,pancard,DOb });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}

let userLogin = async (req, res)=>{
    try{
        const {email, password } = req.body;
        const existingUser = await userlogin.findOne({email});
        if(!existingUser){
            return res.status(400).send({
                message: "user not existed yet "
            })
        }
        const existingUserPassword = await bcrypt.compare(password,existingUser.password)
        if(!existingUserPassword){
            res.status(401).send({
                message: "<<< password is not matched  >>>"
            })
        }


        const tocken = jwt.sign({urlId: existingUser._id, email: existingUser.email},
            "vecrepScreate")

        res.cookie("tocken", tocken)

        res.status(200).send({
            message: "userSuccessfully loging "
        })
    }
    catch(error){
        res.status(500).send({
            message: "something went wrong ",
            error: error
        })
    }
}

let getusers = async(req,res,next)=>{
    try{
        let allusers = await userlogin.find()
        res.status(200).send({
            message: "got all users",
            users: allusers
        })

    }
    catch (error){
        res.status(400).send({
            message: "error in the get users",
            error: error
        })
    }
}

let dropUser = async (req, res, next)=>{
    try{
        //let email = req.params
        let user = await userlogin.findByIdAndDelete(req.params.id)
        allUsers = await userlogin.find()
        res.status(200).send({
            message: " good result",
            result : allUsers
        })
    }
    catch(error){
        res.send(error)
    }
}

let updateUser = async( req, res, next)=>{
    try{
        let id = req.params.id
        console.log("............:", id)
        let user = await userlogin.findOneAndUpdate({id:id},
            { $set:{
                name :req.body.name,
                 email: req.body.email,
                  password:req.body.password,
                   phonenumber: req.body.phonenumber,
                   GSTnumber : req.body.GSTnumber,
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
    catch(error){
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
    updateUser
}