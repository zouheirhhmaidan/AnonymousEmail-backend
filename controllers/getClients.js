const ClientModel = require('../models/Client')

exports.getUsers = (req,res) => {
    ClientModel.find({}, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            console.log(result)
            res.status(200).send(result)
        }
    })
}