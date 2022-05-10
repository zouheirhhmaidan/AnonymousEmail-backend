exports.login = async (req,res) => {
    const Schema = joi.object({
        email: joi.string().min(3).max(200).required().email(),
        password: joi.string().min(6).max(200).required(),
        token: joi.string()
    })

    const {error} = Schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)
   

    let user = await ClientModel.findOne({ email: req.body.email })
    

    if (!user) return res.status(400).send('invalid credentials')
    

   try {
    
    
     await ClientModel.find(req.body.email && req.body.password)
     
   } catch(err) {
       console.log(err)
   }
  
      
}