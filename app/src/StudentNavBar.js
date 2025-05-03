import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './assets/internatlas-logo.png';
import './AdminNavBar.css'; // includes shared styles like nav-item-link, logo-img

const StudentNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Navbar expand="lg" bg="white" className="shadow-sm custom-navbar">
            <Container>
                <Navbar.Brand
                    style={{ cursor: 'pointer', paddingLeft: '12px' }}
                    onClick={() => navigate('/landing-page')}
                    className="logo-wrapper"
                >
                    <img
                        src={logo}
                        alt="InternAtlas Logo"
                        className="logo-img"
                        style={{ display: 'block' }}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link
                            className={`nav-item-link ${isActive('/search') ? 'active-link' : ''}`}
                            onClick={() => navigate('/search')}
                        >
                            Rating & Reviews
                        </Nav.Link>

                        <Nav.Link
                            className={`nav-item-link ${isActive('/track-applications') ? 'active-link' : ''}`}
                            onClick={() => navigate('/track-applications')}
                        >
                            Track Applications
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-item-link ${isActive('/search-opportunities') ? 'active-link' : ''}`}
                            onClick={() => navigate('/search-opportunities')}
                        >
                            Explore Training Opportunities
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

export default StudentNavbar;
