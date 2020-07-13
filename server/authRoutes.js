const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'password',
    database : 'TodoList'
})

db.connect((err) => {
    if(err){
        throw err
    }
    console.log('connected to my sql')
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    
    if (username && password) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let q = `INSERT INTO users (u_name, password)
        VALUES('${username}','${hash}')`
        console.log(username, password)
        try{
            const results = await Query(q)
            res.json(results)
        }
        catch(err){
            console.log(err)
        }

    }
    else {
        res.status(400).send("missing some info")
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log('req.body:', req.body)
    if (username && password) {
        const q = `SELECT * FROM users WHERE u_name = '${username}'`
        try{
            const user = await Query(q)
             if (user) {
            if (bcrypt.compareSync(password, user[0].password)) {

                jwt.sign({ username, isAdmin: user[0].isAdmin }, "todos", { expiresIn: "30m" },
                    (err, token) => {
                        if (err) {
                            res.sendStatus(500)
                            throw err
                        }
                        res.json({ token, user })
                        
                    })
            }
            else {
                res.status(400).send("wrong password")
            }
        }
        else {
            res.status(400).send("user not found")
        }
        }
        catch(err){
            console.log(err)
        }
       
    }
    else {
        res.status(400).send("missing some info")
    }
})

router.get('/users', async (req, res) => {
    let q = `SELECT * FROM users`
    try{
        const results = await Query(q)
        res.json(results)
    }
    catch(err){
        console.log(err)
    }
})

const Query = (q, ...par) => {
    return new Promise((resolve, reject) => {
        db.query(q, par, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results)
            }
        })
    })
}


module.exports = router