const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const onlyUsers = require('./onlyUsers');
const onlyAdmins = require('./onlyAdmins')

app.use(express.json());
app.use(cors());

//Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'TodoList'
})
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("connected to my sql")
})

//Users&Admins auth
app.use("/api/auth", require("./authRoutes"))

//Get all todos: By User
app.get("/api/todos", onlyUsers, async (req, res) => {
    let q = `SELECT * FROM todos`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Add a todo:
app.post("/api/todos", onlyAdmins, async (req, res) => {
    const { description, isCompleted } = req.body;
    let q = `INSERT INTO todos (description, isCompleted)
    VALUES ('${description}',${isCompleted})`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Edit todo:
app.put("/api/todos", onlyUsers, async (req, res) => {
    const { editedId, editedDesc, editedIsComp } = req.body
    console.log(req.body);
    let q = `UPDATE todos
    SET description = '${editedDesc}',
    isCompleted = ${editedIsComp}
    WHERE id = ${editedId}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Delete todo:
app.delete("/api/todos/:id", onlyAdmins, async (req, res) => {
    const { id } = req.params;
    let q = `DELETE FROM todos WHERE id = ${id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

// Query Promise Function
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

app.listen(3001, () => console.log('listeting on http://localhost:3001'))

module.exports = { Query }
