const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ClientModel = require('./models/Client')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Client API',
            description: 'Client API info',
            contact: {
                name: 'Areeba'
            },
            servers: ["http://localhost:3001"]
        }
    },
    apis: ["server.js"]
}



 const db = mongoose.connect('mongodb+srv://mern:mongodb@cluster0.bii6v.mongodb.net/areeba?retryWrites=true&w=majority')
.then((result) => {
    console.log('Connected to database')
})
.catch((error) => {
    console.log(error)
})
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(express.json())
 app.use(cors())
 app.use(cookieParser())
 app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
 



app.use('/client',routes)


/**
 * @swagger
 * {/client}
 * ---
 * post: 
 * 
 * responses:
 * '200':
 *      description: A successful response
 */
app.get('/set-cookies', (req,res) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
    res.send('you got the cookies!')
})

app.get('/read-cookies', (req,res) => {
    const cookies = req.cookies
    console.log(cookies.newUser)

    res.json(cookies)
})



app.listen(3001, (req,res) => {
    console.log('Server running on port 3001')
}) 


module.exports = db