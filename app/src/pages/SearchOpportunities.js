import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OpportunityCard from '../components/OpportunityCard';
import FilterPanel from '../components/FilterPanel';
import { opportunities } from '../Data/dummyData.js';

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
    <Container className="my-5">
      <h2 className="mb-4 text-center">Internship Opportunities</h2>

      <div className="d-flex justify-content-between align-items-center">
        <FilterPanel filters={filters} onChange={handleFilterChange} />
      </div>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search position name..."
          value={filters.title}
          onChange={e => handleFilterChange('title', e.target.value)}
        />
      </Form>

      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {filtered.map(op => (
          <OpportunityCard
            key={op.id}
            opportunity={op}
            onClick={() => navigate(`/opportunity/${op.id}`)}
          />
        ))}
      </div>
    </Container>
  );
}

export default SearchOpportunities;
