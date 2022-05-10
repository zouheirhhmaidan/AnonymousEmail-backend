const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const genAuthToken = require('../utils/genAuthToken/genAuthToken')
const ClientSchema = new mongoose.Schema({
    // name: {type: String},
    email: {type: String, required: true, minlength: 3, maxlength: 200,
    unique: true},
    password: {type: String, required: true, minlength: 3, maxlength: 1024, },
    token: {type: String}
    
})

ClientSchema.post('save', function(doc,next) {
    console.log('new user was created and saved', doc)
    next()
})

ClientSchema.pre('save', async function(next) {
   const salt = await bcrypt.genSalt()
   this.password = await bcrypt.hash(this.password, salt)
    next()
})

ClientSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if(user) {
      const auth = await  bcrypt.compare(password, user.password)
    
    if(auth) {
        
        return (user)
    }
    throw Error('incorrect password')
}
    throw Error('incorrect email')
}



const ClientModel = mongoose.model('clients', ClientSchema)
module.exports = ClientModel