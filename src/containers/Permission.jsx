import React, { useEffect, useState } from 'react'
import {Container, Form, Stack} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

export default function Permission() {

const [listPermissionType, setlistPermissionType] = useState([]);
const [data, setData] = useState({nombreEmpleado: "",
apellidoEmpleado: "",
permissionTypeID: 0})

const history = useNavigate();

const handleChange = ({target}) => {
  console.log(target.value);
  setData({
    ...data,
    [target.name]: target.value
  })
}

const URL = "https://localhost:7257/api/Permission/AddPermissionAsync"
const URLPermissionType = "https://localhost:7257/api/PermissionType/GetAllPermissionTypesAsync"

const getDataPermissionType = async () => {
  const response = await axios.get(URLPermissionType);
  
  return response;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(data);
  await axios.post(URL, data).then(function (response) {
    console.log(response);
    if(response.status == 200){
      swal("Great!", "Your permission has been created!", "success");
      history('/')
    }else{
      swal("Oops!", "Something went wrong!", "error");
    }
  });
}

useEffect(() => {
  getDataPermissionType().then((response) => {
      console.log(response.data)
      setlistPermissionType(response.data);
  })
}, [])

  return (
    <Container>
     <h1 className='text-center'>New Permission</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
              <Form.Control type='text'
                            name='nombreEmpleado'
                            placeholder='Employee name'
                            value={data.nombreEmpleado}  
                            onChange={handleChange}
                            required
                            />
          </Form.Group>
          <Form.Group className='mb-3'>
              <Form.Control type='text'
                            name='apellidoEmpleado'
                            placeholder='Employee last name'
                            value={data.apellidoEmpleado}  
                            onChange={handleChange}
                            required
                            />
          </Form.Group>
          <Form.Group className='mb-3'>
          <Form.Select aria-label="Default select example"
                                         name='permissionTypeID' 
                                         value={data.permissionTypeID}
                                         onChange={handleChange}>
                                <option value='0'>Open this select menu</option>
                                {
                                    listPermissionType.map(permissiontype =>{
                                        return (<option value={permissiontype.id}>{permissiontype.description}</option>)
                                    })
                                }
                            </Form.Select> 
          </Form.Group>
          <Stack direction="horizontal" gap={2}>
            <button  className='btn btn-success'>Save</button>
            <Link to='/' className='btn btn-default'>Cancel</Link>
          </Stack>
          
        </Form>
    </Container>
  )
}
