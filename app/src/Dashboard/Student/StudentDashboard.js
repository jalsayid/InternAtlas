import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import '../Dashboard.css';

import logo from '../../assets/internatlas-logo.png';
import { useNavigate } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

const StudentDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header px-4 py-2 d-flex justify-content-between align-items-center bg-light">
                <span className="text-muted small">Student Dashboard</span>
                <div className="d-flex align-items-center gap-2">
                    <PersonCircle size={24} />
                    <span className="fw-bold">Hello, Danah</span>
                </div>
            </div>

            <Container className="text-center py-5">
                <Image src={logo} height="300" className="mb-3" />

                <Row className="justify-content-center gy-3">
                    <Col xs={12} md={4}>
                        <Button
                            className="primary-btn w-100"
                            onClick={() => navigate('/search-opportunities')}
                        >
                            Explore Training Opportunities
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            className="primary-btn w-100"
                            onClick={() => navigate('/track-applications')}
                        >
                            Track Applications
                        </Button>
                    </Col>
                    <Col xs={12} md={6}>
                        <Button
                            className="primary-btn w-100"
                            onClick={() => navigate('/search')}
                        >
                            Ratings & Reviews
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StudentDashboard;
