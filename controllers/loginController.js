const joi = require('joi')
const ClientModel = require('../models/Client')
exports.login = async (req,res) => {
    
    const Schema = joi.object({
        email: joi.string().min(3).max(200).required().email(),
        password: joi.string().min(6).max(200).required(),
        token: joi.string()
    })

    const {error} = Schema.validate(req.body)





    if(error) return res.status(400).send(error.details[0].message)
   


    let user =  ClientModel.findOne({ email: req.email })
    
    console.log(req.email)

    if (!user) return res.status(400).send('invalid credentials')
    
    try{


   await ClientModel.findOne({email: req.email, password: req.password})

   
   } catch(err) {
       console.log('from login cont',err)
   }
  
      
}