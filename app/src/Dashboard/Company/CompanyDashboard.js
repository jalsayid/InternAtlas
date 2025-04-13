import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import '../Dashboard.css';

import logo from '../../assets/internatlas-logo.png';
import { useNavigate } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

const CompanyDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header px-4 py-2 d-flex justify-content-between align-items-center bg-light">
                <span className="text-muted small">Company Dashboard</span>
                <div className="d-flex align-items-center gap-2">
                    <PersonCircle size={24} />
                    <span className="fw-bold">Hello, Sabic</span>
                </div>
            </div>

            <Container className="text-center py-5">
                <Image src={logo} height="300" className="mb-3" />

                <Row className="justify-content-center gy-3">
                    <Col xs={12} md={4}>
                        <Button
                            variant="none"
                            className="primary-btn w-100"
                            onClick={() => navigate('/company/post')}
                        >
                            Post New Opportunity
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            variant="none"
                            className="primary-btn w-100"
                            onClick={() => navigate('/company/applications')}
                        >
                            Manage Applications
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CompanyDashboard;
