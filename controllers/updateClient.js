const ClientModel = require('../models/Client')

exports.updateUsers = async (req,res) => {
    const email = req.body.email
    const id = req.body.email
    console.log(email, id)

    try {
        await ClientModel.findById(id, (error, clientToUpdate) =>{
            clientToUpdate.email = email
            clientToUpdate.save()
            
        })
    } catch(err) {
        console.log(err)
    }

    res.send('updated')
}