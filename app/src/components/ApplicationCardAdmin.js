import React from 'react';
import { Card, Row, Col ,Button} from 'react-bootstrap';



function ApplicationCardAdmin({ app, onDelete }) {

  


  return (
    <Card className="mb-2 shadow-sm" style={{ cursor: 'pointer'}}>
      <Card.Body>
        <Row className="align-items-center">
          <Col style={{textAlign: "left"}}>
            <h5 style={{fontSize: "26px", fontFamily: 'Roboto'}}>{app.title}</h5>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Company:</strong> {app.company}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Duration:</strong> {app.type}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Location:</strong> {app.location}</p>
            <div className="d-flex flex-column flex-md-row align-items-start gap-3" style={{color: "black", fontSize: "13px", marginTop:"10px"}}>
            <button
            className='def-btn'
             onClick={(e) => {
                  e.stopPropagation();
                  onDelete(app._id);
                }}
            >Delete</button>

            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ApplicationCardAdmin;
