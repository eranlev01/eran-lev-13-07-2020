import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Register = () => {

let history = useHistory();

const [{username, password}, setCredentials] = useState({
    username: '',
    password:  ''
})

const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(username, password);
    const data = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    if (data.ok) {
        console.log('user have benn sucssecfully added');
        history.push('/login')
    }
    else {
        console.log('err')
    }
}

    return (
        <div className="login">
            <form className="login-form" onSubmit={submit}>
                <h1>Register</h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" value={username} onChange={e => setCredentials({
                    username: e.target.value,
                    password
                })}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" value={password} onChange={e => setCredentials({
                    username,
                    password : e.target.value
                })}/>
                <Button type="submit">Sign-up</Button>
                
            </form>
        </div>
    )
}

export default Register
