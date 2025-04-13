import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/internatlas-logo.png'; // Make sure this path is correct
import './StudentNavBar.css';

const StudentNavBar = () => {
    return (
        <Navbar expand="lg" bg="white" className="shadow-sm py-1 custom-navbar">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        alt="InternAtlas Logo"
                        height="120"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#Reviews" className="nav-item-link active-link">Reviews & Ratings</Nav.Link>
                        <Nav.Link href="#Track" className="nav-item-link">Track Applications</Nav.Link>
                        <Nav.Link href="#Explore" className="nav-item-link">Explore Training Opportunities</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default StudentNavBar;
