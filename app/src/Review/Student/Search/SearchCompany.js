import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import './SearchCompany.css';
import { useNavigate } from 'react-router-dom';
import StudentNavBar from '../../../StudentNavBar'; 
import { opportunities } from '../../../Data/dummyData';
import { StarFill } from 'react-bootstrap-icons';

const SearchCompany = () => {
    const [company, setCompany] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (company.trim() !== '') {
            navigate(`/company/${company}`);
        }
    };

    // Get unique companies from opportunities
    const suggestedCompanies = Array.from(
        new Map(opportunities.map(op => [op.company, op])).values()
    );

    return (
        <>
            <StudentNavBar />

            <Container className="bg-light py-5 min-vh-100">
                <Row className="justify-content-center mb-4">
                    <Col md={6} className="text-center">
                        <h3 className="mb-4 fw-bold text-dark">Enter the company's name :</h3>
                        <InputGroup className="mb-4 shadow-sm">
                            <InputGroup.Text id="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }}>
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

                <h5 className="text-center text-secondary mb-4">Suggested Companies</h5>
                <Row className="justify-content-center">
                    {suggestedCompanies.map((c, i) => (
                        <Col md={6} lg={4} className="mb-4" key={i}>
                            <div
                                className="p-3 shadow-sm bg-white rounded-4 d-flex align-items-center justify-content-between"
                                onClick={() => navigate(`/company/${c.company.toLowerCase()}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={c.logo}
                                    alt={c.company}
                                    style={{ height: '50px', width: '50px', objectFit: 'contain' }}
                                />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-1 fw-bold">{c.company}</h6>
                                    <small className="text-muted">{c.type} • {c.posted}</small>
                                    <div className="mt-1">
                                        {[...Array(5)].map((_, j) => (
                                            <StarFill
                                                key={j}
                                                className={j < c.rating ? 'text-warning' : 'text-secondary'}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default SearchCompany;
