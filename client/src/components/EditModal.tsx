import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface MyVerticallyCenteredModalProps {
  setdescription: any,
  getTodos: any,
  show:boolean,
  onHide:any,
  description: string,
  iscompleted: boolean,
  todotoedit: number,
  myheader: {}
}

const EditModal = (props:MyVerticallyCenteredModalProps) => {

  
    const applyChanges = async (e: React.FormEvent) => {
        e.preventDefault()
        const editedDesc:string = props.description
        const editedIsComp:boolean = props.iscompleted
        const editedId:number = props.todotoedit
        const myHeaders = props.myheader

        const data = await fetch('http://localhost:3001/api/todos', {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({ editedId, editedDesc, editedIsComp })
        })
        if (data.ok) {
            props.getTodos()
            props.onHide()
        }
        else {
            console.log('err')
        }
    }

        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{}</h4>
                <form onSubmit={applyChanges}>
                <input type="text" className="todo-input" placeholder="Add Todo" onChange={e => props.setdescription(e.target.value)} />
                <Button type="submit">Apply Changes</Button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
}

export default EditModal
