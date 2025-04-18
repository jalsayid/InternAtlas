import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './assets/internatlas-logo.png';
import './AdminNavBar.css';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Navbar expand="lg" bg="white" className="shadow-sm custom-navbar">
            <Container>
                <Navbar.Brand
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                    className="logo-wrapper"
                >
                    <img
                        src={logo}
                        alt="InternAtlas Logo"
                        className="logo-img"
                    />
                    
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link
                            className={`nav-item-link ${isActive('/admin/reports') ? 'active-link' : ''}`}
                            onClick={() => navigate('/admin/reports')}
                        >
                            Generate Reports
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-item-link ${isActive('/company-regestration') ? 'active-link' : ''}`}
                            onClick={() => navigate('/company-regestration')}
                        >
                            Manage Company Request
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-item-link ${isActive('/ModerateContentNav') ? 'active-link' : ''}`}
                            onClick={() => navigate('/ModerateContentNav')}
                        >
                            Moderate Content
                        </Nav.Link>
                        <Nav.Link
                            className="nav-item-link"
                            onClick={() => navigate('/')}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
