
const ClientModel = require('../models/Client')
const genAuthToken = require('../utils/genAuthToken/genAuthToken')
const bcrypt = require('bcrypt')
const joi = require('joi')
exports.createUser = async (req,res) => {
    const Schema = joi.object({
        // name: joi.string().min(3).max(30).required(),
        email: joi.string().min(3).max(30).required().email(),
        password: joi.string().min(6).max(20).required(),
        token: joi.string(),
    })

    const {error} = Schema.validate(req.body)
    console.log("erorrrrrrrr",error)

    if(error) return res.status(400).send(error.details[0].message)

    let user = await ClientModel.findOne({email: req.body.email})

    if(user) return res.status(400).send("user exists")


    user = new ClientModel({
        // name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        
    })

    
    const token = genAuthToken(user)

    const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        user= new ClientModel({
            // name: req.body.name,
            email: req.body.email,
        password: req.body.password,
        token :token
        })
   user = await user.save()

      res.send(token)

   
}