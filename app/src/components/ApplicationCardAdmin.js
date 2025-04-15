import React from 'react';
import { Card, Row, Col ,Button} from 'react-bootstrap';



function ApplicationCardAdmin({ app, onDelete }) {

  


  return (
    <Card className="mb-2 shadow-sm" style={{ cursor: 'pointer'}}>
      <Card.Body>
        <Row className="align-items-center">
          <Col style={{textAlign: "left"}}>
            <h5 style={{fontSize: "26px", fontFamily: 'Roboto'}}>{app.position}</h5>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Company:</strong> {app.company}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Duration:</strong> {app.duration}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Location:</strong> {app.location}</p>
            <div className="d-flex flex-column flex-md-row align-items-start gap-3" style={{color: "black", fontSize: "13px", marginTop:"10px"}}>
            <Button onClick={(e) => {
                  e.stopPropagation();
                  onDelete(app.id);
                }}
                style={{ padding: '4px 8px', fontSize: '12px' }} type="button" variant="danger">Delete</Button>

            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ApplicationCardAdmin;
