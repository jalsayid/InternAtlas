import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function OpportunityCard({ opportunity, onClick }) {
  return (
    <Card onClick={() => onClick(opportunity)} className="mb-3 shadow-sm" style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Row>
        
          <Col xs={2} className="d-flex align-items-center">
            <img
              src={opportunity.logo}
              alt={opportunity.company}
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
          </Col>

        
          <Col xs={10}>
            <Card.Title>{opportunity.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{opportunity.company}</Card.Subtitle>
            <Card.Text>
              <Badge bg="secondary">{opportunity.location}</Badge> | {opportunity.type} | {opportunity.posted}
              <br />
              {Array(opportunity.rating).fill('⭐').join('')}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default OpportunityCard;
