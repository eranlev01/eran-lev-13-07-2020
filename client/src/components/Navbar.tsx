import React from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
const Navbar = () => {

    let history = useHistory();

    const logout = () => {
        history.push('/')
        sessionStorage.clear()
    }

    return (
        <div>
            <nav className="nav">
                <div></div>
                <Button className="logout" onClick={logout}>Logout</Button>
            </nav>
        </div>
    )
}

export default Navbar
