import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function OpportunityCard({ opportunity, onClick }) {
  return (
    <Card onClick={() => onClick(opportunity)} className="mb-3 shadow-sm" style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Row className="align-items-center flex-wrap gy-3">
          {/* Logo */}
          <Col xs={12} sm={3} className="text-center">
            <img
              src={opportunity.logo}
              alt={opportunity.company}
              style={{ width: '90px', height: '90px', objectFit: 'contain' }}
            />
          </Col>

          {/* Text Content */}
          <Col xs={12} sm={9}>
            <Card.Title className="mb-1">{opportunity.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{opportunity.company}</Card.Subtitle>
            <Card.Text className="mb-1">
              <Badge bg="secondary" className="me-2">{opportunity.location}</Badge>
              <small>{opportunity.type} | {opportunity.posted}</small>
            </Card.Text>
            <div style={{ fontSize: "18px", color: "#f5b301" }}>
              {Array(opportunity.rating).fill('⭐').join('')}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default OpportunityCard;
