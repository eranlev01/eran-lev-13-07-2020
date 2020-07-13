import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from './Navbar';

const UserDashboard = () => {

    useEffect(() => {
        getTodos()
    }, [])

    const [todos, setTodos] = useState<any[]>([])
    const token:string = sessionStorage.getItem('token')! ?? ''
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    const getTodos = async () => {
        await fetch('http://localhost:3001/api/todos', {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => setTodos(res))
            .catch(err => console.log(err))
    } 

    const applyChanges = async (isComp:boolean, id:number, desc:string) => {

        const data = await fetch('http://localhost:3001/api/todos', {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({ editedId:id, editedDesc:desc, editedIsComp:isComp })
        })
        if (data.ok) {
            getTodos()
        }
        else {
            console.log('err')
        }
    }

    const check = async (isComp:boolean, id:number, desc:string) => {
        console.log('isComp:', isComp,'id:', id, 'desc:', desc)
        if(isComp) {
            isComp = false
            applyChanges(isComp, id, desc)
        }
        else {
            isComp = true
            applyChanges(isComp, id, desc)
        }
    }

    return (
        
        <div>
            <Navbar />
            <div className="admin-dashboard-div">
              <h1>Todo list</h1>
            <ListGroup className="listGroup">
                    {todos.map((t, i) => (
                        <ListGroup.Item className="todo" key={i}>
                            <span>{t.description}</span> <input type="checkbox" checked={t.isCompleted} onChange={e => check(t.isCompleted, t.id, t.description)}/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>  
            </div>
            
        </div>
    )
}

export default UserDashboard
