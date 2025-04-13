import React, { useState } from 'react'; 
import { Button, Form, Collapse, Row, Col } from 'react-bootstrap';
import { FunnelFill } from 'react-bootstrap-icons'; 

function FilterPanel({ filters, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        style={{ backgroundColor: '#FFB608', borderColor: '#FFB608', color: 'black' }}
        className="mb-3"
        onClick={() => setOpen(!open)}
        aria-controls="filter-collapse"
        aria-expanded={open}
      >
        <FunnelFill /> Filter
      </Button>

      <Collapse in={open}>
        <div id="filter-collapse">
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={filters.duration}
                  onChange={e => onChange('type', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Summer Training">Summer Training</option>
                  <option value="Internship">Internship</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by location"
                  value={filters.location}
                  onChange={e => onChange('location', e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by company"
                  value={filters.company}
                  onChange={e => onChange('company', e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Collapse>
    </>
  );
}

export default FilterPanel;
