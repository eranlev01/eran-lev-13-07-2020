const jwt = require('jsonwebtoken');

const onlyUsers = (req, res, next) => {
    
    const token = req.header("authorization")
    if (token) {
        jwt.verify(token, "todos", (err, decoded) => {
            if (err) {
                res.sendStatus(401)
            }
            else {
                req.user = decoded
                next()
            }
        })
    }
    else {
        res.sendStatus(401)
    }
}


module.exports = onlyUsers;