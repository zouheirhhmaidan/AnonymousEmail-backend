const { JsonWebTokenError } = require("jsonwebtoken")
const ClientModel = require("../models/Client")
const JWT = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let error = {email: '', password: ''}

    if(err.code === 11000) {
        error.email = 'that email is already in use'
        return error
    }

    if(err.message.includes('user validation failed')) {
       Object.values(err.errors).forEach(({properties}) => {
           error[properties.path] = properties.message
       }) 
    }
    return error
}



const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return JWT.sign({id}, 'zouheir secret') 
}

module.exports.signup_get = (req,res) => {
    res.json('signup')
}
module.exports.login_get = (req,res) => {
    res.json('login')
}
module.exports.signup_post = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await ClientModel.create({email, password, token})
        const token = createToken(user._id);
        console.log(token)
        res.status(201).json({user: user._id, token})
        
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}
module.exports.login_post = async (req,res) => {
    const {email, password} = req.body
    // ClientModel.login(email, password)
    // res.send('user login')
    try {
        const user = await ClientModel.login(email, password)
        const token = createToken(user._id);
        console.log(token)
        res.status(200).json({user: user._id, token})
    }
    catch(err) {
        res.status(400).json({})
    }
}

