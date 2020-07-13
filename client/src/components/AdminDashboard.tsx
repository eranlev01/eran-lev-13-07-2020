import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import EditModal from './EditModal';

const AdminDashboard = () => {

    
    useEffect(() => {
        getTodos()
    }, [])


    const [todos, setTodos] = useState<any[]>([])
    const [description, setDescription] = useState<string>('')
    const isCompleted:boolean = false
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [todoToEdit, setTodoToEdit] = useState<number>(0);
    

    const token = sessionStorage.getItem('token')!
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)


    //GET POST PUT DELETE Functions

    const getTodos = async () => {

        await fetch('http://localhost:3001/api/todos', {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                setTodos(res)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const add = async () => {
        console.log(description, isCompleted)
        const data = await fetch('http://localhost:3001/api/todos', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ description, isCompleted })
        })
        if (data.ok) {
            alert('Todo was added successfully')
            const res = await data.json()
            console.log(res);
            getTodos()
        }
        else {
            console.log('err')
        }

    }

    const deleteTodo = async (e: any) => {
        await fetch(`http://localhost:3001/api/todos/${e}`,
            {
                method: "delete",
                headers: myHeaders
            })
            .then(data => data.json())
            .then(res => {
                getTodos()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const edit = async (id:number) => {
        setModalShow(true)
        setTodoToEdit(id)
    }


    return (
        <div>
            <Navbar />
            <div className="admin-dashboard-div">
                <h1>Task management</h1>
                <div className="add-todo">
                    <input type="text" className="todo-input" placeholder="Add Todo" onChange={e => setDescription(e.target.value)} />
                    <div className="btn-div">
                        <Button className="add-btn" onClick={add}>Add</Button>
                    </div>

                </div>

                <ListGroup className="listGroup">
                    {todos.map((t, i) => (
                        <ListGroup.Item className="todo" key={i}>
                            <span>{t.description}</span> <input type="checkbox" checked={t.isCompleted} readOnly/>
                            <div className="btns-div">
                              <Button variant="danger" onClick={e => deleteTodo(t.id)}>Delete</Button>
                            <Button variant="warning" onClick={e => edit(t.id)}>Edit</Button>  
                            </div>
                            
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <EditModal
                    show={modalShow}
                    description={description}
                    setdescription={setDescription}
                    iscompleted={isCompleted}
                    myheader={myHeaders}
                    getTodos={getTodos}
                    todotoedit={todoToEdit}
                    onHide={() => setModalShow(false)}
                />
            </div>

        </div>
    )
}

export default AdminDashboard
