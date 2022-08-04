import React from 'react'
import { Container } from 'react-bootstrap'
import PermissionList from '../components/PermissionList'

export default function App() {
  return (
    <Container fluid>   
        <h1 className='text-center'>Permission List</h1>
        <PermissionList />
    </Container>
  )
}
