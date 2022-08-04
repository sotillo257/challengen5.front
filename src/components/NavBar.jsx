import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
        <Navbar  bg="dark" variant="dark">
            <Container fluid>      
                <Link to="/" className='navbar-brand'>N5 Challenge</Link>              
                <Nav className="me-auto">
                    <Link to="/" className='nav-link'>List</Link>
                    <Link to="/New" className='nav-link'>Add</Link>
                </Nav>
            </Container>
        </Navbar>
  )
}
