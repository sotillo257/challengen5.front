import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function CardPermission({permission, updateList, handleCloseModal,handleShowModal,setDataModal}) {

    const handleEdit = () =>{
        handleShowModal();
        setDataModal(permission);

    }

  return (
    <div className='col-md-3'>
        <Card>
            <Card.Body>
                <Card.Title>{permission.nombreEmpleado} {permission.apellidoEmpleado}</Card.Title>
                <ListGroup className='mb-2'>
                    <ListGroupItem><strong>Permision Type: {permission.permissionType.description}</strong></ListGroupItem>
                    <ListGroupItem><strong>Date:</strong> {permission.fechaPermiso.substring(0, 10)}</ListGroupItem>
                </ListGroup>
                <button className='btn btn-primary' onClick={handleEdit} >Edit</button>
            </Card.Body>
        </Card>
    </div>
  )
}
