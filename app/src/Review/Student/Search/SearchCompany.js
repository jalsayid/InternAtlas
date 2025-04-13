import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import './SearchCompany.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../StudentNavBar';

const SearchCompany = () => {
    const [company, setCompany] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (company.trim() !== '') {
            navigate(`/company/${company}`);
        }
    };

    return (
        <>
            <NavBar />

            <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <Row>
                    <Col className="text-center">
                        <h3 className="mb-4 fw-bold text-dark">Enter the company's name :</h3>
                        <InputGroup className="mb-3 shadow-sm">
                            <InputGroup.Text
                                id="search-icon"
                                onClick={handleSearch}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                className="custom-input"
                                placeholder="Search for a company"
                                aria-label="Search for a company"
                                aria-describedby="search-icon"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SearchCompany;
