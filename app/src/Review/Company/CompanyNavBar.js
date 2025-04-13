import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/internatlas-logo.png';
import './CompanyNavBar.css';

const CompanyNavBar = () => {
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
                        <Nav.Link href="#Post" className="nav-item-link">Post New Opportunity</Nav.Link>
                        <Nav.Link href="#Manage" className="nav-item-link">Manage Applications</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CompanyNavBar;
