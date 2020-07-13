const jwt = require('jsonwebtoken');

const onlyAdmins = (req, res, next) => {
    const token = req.header("authorization")
    if (token) {
        jwt.verify(token, "todos", (err, decoded) => {
            if (err) {
                res.sendStatus(401)
            }
            else {
                if (decoded.isAdmin) {
                    req.user = decoded
                    next()
                }
                else {
                    res.status(401).send('Only Admins')
                }
            }
        })
    }
    else {
        res.sendStatus(401)
    }
}

module.exports = onlyAdmins;