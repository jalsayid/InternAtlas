import React, { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OpportunityCard from '../components/OpportunityCard';
import FilterPanel from '../components/FilterPanel';
import { opportunities } from '../Data/dummyData.js';
import StudentNavBar from '../StudentNavBar'; 

function SearchOpportunities() {
  const [filters, setFilters] = useState({
    type: '',
    company: '',
    location: '',
    title: ''
  });

  const navigate = useNavigate();

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filtered = opportunities.filter(o =>
    (!filters.type || o.type === filters.type) &&
    (!filters.company || o.company.toLowerCase().includes(filters.company.toLowerCase())) &&
    (!filters.location || o.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.title || o.title.toLowerCase().includes(filters.title.toLowerCase()))
  );

  return (
    <>
      <StudentNavBar />

      <Container className="my-5">
  <Row className="justify-content-center">
    <Col md="auto">
      <h1 className="page-title" style={{ marginLeft: "20px" }}>Internship Opportunities</h1>
    </Col>
  </Row>


        {/* Filters */}
        <div className="mb-3">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </div>

        {/* Search by Title */}
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by internship title..."
            value={filters.title}
            onChange={e => handleFilterChange('title', e.target.value)}
          />
        </Form>

        {/* Results */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {filtered.length > 0 ? (
            filtered.map(op => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                onClick={() => navigate(`/opportunity/${op.id}`)}
              />
            ))
          ) : (
            <p className="text-muted text-center">No opportunities match your search.</p>
          )}
        </div>
      </Container>
    </>
  );
}

export default SearchOpportunities;
