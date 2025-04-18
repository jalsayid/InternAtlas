import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { StarFill } from 'react-bootstrap-icons';


const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(<StarFill key={i} className="text-warning me-1" />);
    }
    return stars;
};


function TrackCommentsCard({ app, onDelete}) {
  return (
    <Card className="mb-2 shadow-sm" style={{ cursor: 'pointer'}}>
      <Card.Body>
        <Row className="align-items-center">
          <Col style={{textAlign: "left"}}>
            <h5 style={{fontSize: "26px", fontFamily: 'Roboto'}}>{app.user}</h5>
            <div>{renderStars(app.rating)}</div>            
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Company:</strong> {app.company}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Comment:</strong> {app.comment}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Reason:</strong> {app.reason}</p>
            <div className="d-flex flex-column flex-md-row align-items-start gap-3" style={{color: "black", fontSize: "13px", marginTop:"10px"}}>
              <button onClick={(e) => {
                  e.stopPropagation();
                  onDelete(app.id);
                }}
                className='second-btn'>Delete</button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackCommentsCard;
