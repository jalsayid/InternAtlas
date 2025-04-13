import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';



function TrackApplicationCardRawan({ app, onClick }) {
  return (
    <Card onClick={() => onClick(app)} className="mb-3 shadow-sm" style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <h5>{app.position}</h5>
            <p className="mb-1"><strong>Company:</strong> {app.company}</p>
            <p className="mb-1"><strong>Duration:</strong> {app.duration}</p>
            <p><strong>Location:</strong> {app.location}</p>
          </Col>
          <Col xs="auto">
            <Badge
              bg={
                app.status === "Accepted" ? "success" :
                app.status === "Rejected" ? "danger" : "warning"
              }
              className="p-2"
            >
              {app.status}
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackApplicationCardRawan;
