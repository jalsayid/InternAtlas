import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';



function TrackProfilesCard({ app ,onClick, onDelete}) {
  return (
    <Card onClick={() => onClick(app)} className="mb-2 shadow-sm" style={{ cursor: 'pointer'}}>
      <Card.Body>
        <Row className="align-items-center">
        <Col xs="auto">
            <Image 
              src={app.logo} 
              roundedCircle 
              width={100} 
              height={100}
              alt="Company Logo" />
          </Col>

          <Col style={{textAlign: "left"}}>
            <h5 style={{fontSize: "26px", fontFamily: 'Roboto'}}>{app.name}</h5>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Contact Person:</strong> {app.contactPerson}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Industry:</strong> {app.industry}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Location:</strong> {app.location}</p>
            <div className="d-flex flex-column flex-md-row align-items-start gap-3" style={{color: "black", fontSize: "13px", marginTop:"10px"}}>
              <button onClick={(e) => {
                  e.stopPropagation();
                  onDelete(app.id);
                }}
               type="button" className='def-btn'>Delete</button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackProfilesCard;
