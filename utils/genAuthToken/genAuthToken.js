const jwt = require('jsonwebtoken')

const genAuthToken = (user) => {
    const secretKey = 'zouheirhmaidan'

    const token = jwt.sign({
        _id: user._id, email: user.email
    }, secretKey
    )
    return token
}

module.exports = genAuthToken