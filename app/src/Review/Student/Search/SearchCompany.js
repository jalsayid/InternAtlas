import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentNavBar from '../../../StudentNavBar';
import './SearchCompany.css';

const SearchCompany = () => {
  const [company, setCompany] = useState('');
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const navigate = useNavigate();

  // Fetch companies from backend on component mount
  useEffect(() => {
    fetch(`https://internatlas.onrender.com/api/internships`)  // Adjust your endpoint if needed
      .then(res => res.json())
      .then(data => setSuggestedCompanies(data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  const handleSearch = () => {
    if (company.trim() !== '') {
      navigate(`/company/${company}`);
    }
  };

  return (
    <>
      <StudentNavBar />
      <Container className="bg-light py-5 min-vh-100">
        <Row className="justify-content-center mb-4">
          <Col md={6} className="text-center">
            <h1 className="page-title">Ratings & Reviews</h1>
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
                onClick={() => navigate(`/company/${c.company}/${encodeURIComponent(c.title)}`)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={c.logo}
                  alt={c.company}
                  style={{ height: '50px', width: '50px', objectFit: 'contain' }}
                />
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1 fw-bold">{c.company}</h6>
                  <small className="text-muted">{c.title} • {c.type}</small>
                  <div className="mt-1">
                   
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
