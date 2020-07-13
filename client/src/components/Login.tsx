import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Login = () => {

    let history = useHistory();

    const [{ username, password }, setCredentials] = useState({
        username: '',
        password: ''
    })

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        if (data.ok) {
            const res = await data.json()
            sessionStorage.token = res.token
            const admin = res.user[0].isAdmin
            sessionStorage.isAdmin = admin
            const u_id = res.user[0].id
            sessionStorage.u_id = u_id

            if(admin){
                history.push('/admin-dashboard')
            }
            else{
                history.push('/user-dashboard')
            }
            
        }
        else {
            console.log('err')
        }
    }
    const goRegsiter = () => {
        history.push('/register')
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={submit}>
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" value={username} onChange={e => setCredentials({
                    username: e.target.value,
                    password
                })} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" value={password} onChange={e => setCredentials({
                    username,
                    password: e.target.value
                })} />
                <Button type="submit">Sign-in</Button>
                <span>Don't have an account?</span>
                <Button onClick={goRegsiter} variant="info">Register</Button>
            </form>
        </div>
    )
}

export default Login