import React from 'react'
import {Navbar, Nav, Link} from 'react-bootstrap'

const Navibar = (props) =>{

    return(
        <Navbar collapseOnSelect bg='light'>
            <Navbar.Brand href="/">Kuna App</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                <Nav.Link href="/Indicators">Indicators</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navibar;