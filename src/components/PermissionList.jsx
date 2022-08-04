import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardPermission from './CardPermission';
import swal from 'sweetalert';
import { Container, Row, Modal, Button, Form } from 'react-bootstrap'

export default function PermissionList() {
    const URL = "https://localhost:7257/api/Permission/GetAllPermissionsAsync"
    const URLPermissionType = "https://localhost:7257/api/PermissionType/GetAllPermissionTypesAsync"
    const URLEDIT = "https://localhost:7257/api/Permission/UpdatePermission"
    
    const getData = async () => {
        const response = await axios.get(URL);
        
        return response;
    }

    const getDataPermissionType = async () => {
        const response = await axios.get(URLPermissionType);
        
        return response;
    }

    const [list, setList] = useState([]);
    const [listPermissionType, setlistPermissionType] = useState([]);
    const [updateList, setupdateList] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    
    useEffect(() => {
        getData().then((response) => {
            setList(response.data.permissions);
        })
    }, [updateList])

    useEffect(() => {
        getDataPermissionType().then((response) => {
            console.log(response.data)
            setlistPermissionType(response.data);
        })
    }, [])

    const handleCloseModal = async () => {
        setShowModal(false)
    }

    const handleShowModal = async () => {
        setShowModal(true)
    }

    const handleSubmit = async () => {
       await axios.put(URLEDIT,dataModal).then(function (response) {
            console.log(response);
            if(response.status == 200){
              swal("Great!", "Your permission has been updated!", "success");
              handleCloseModal();
              setupdateList(!updateList);
            }else{
              swal("Oops!", "Something went wrong!", "error");
            }
          });
    }

    const handleChange = ({target}) => {
        setDataModal({
          ...dataModal,
          [target.name]: target.value
        })
      }
 
  return (
    <Container>
        <Row>
            {
                list.map((permiss, index) => (
                    <CardPermission key={index} permission={permiss} 
                    updateList={updateList}
                    handleCloseModal={handleCloseModal}
                    handleShowModal={handleShowModal}
                    setDataModal={setDataModal}
                    />
                ))
            }
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} >
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>Employee name</Form.Label>
                            <Form.Control type='text'
                                            name='nombreEmpleado'
                                            placeholder='Employee name'
                                            value={dataModal.nombreEmpleado}  
                                            onChange={handleChange}
                                            required
                                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Employee last name</Form.Label>
                            <Form.Control type='text'
                                            name='apellidoEmpleado'
                                            placeholder='Employee last name'
                                            value={dataModal.apellidoEmpleado}  
                                            onChange={handleChange}
                                            required
                                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                        <Form.Label>permission type</Form.Label>
                            <Form.Select aria-label="Default select example"
                                         name='permissionTypeID' 
                                         value={dataModal.permissionTypeID}
                                         onChange={handleChange}>
                                <option value='0'>Open this select menu</option>
                                {
                                    listPermissionType.map(permissiontype =>{
                                        return (<option value={permissiontype.id}>{permissiontype.description}</option>)
                                    })
                                }
                            </Form.Select>                            
                        </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>
  )
}
