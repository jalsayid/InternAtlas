import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function TrackApplicationCard({ app }) {
  const navigate = useNavigate();

  const goToOpportunityDetails = () => {
    navigate('/OpportunityDetails');
  };
  const goToViewReviews = () => {
    navigate(`/CompanyReview/${app.company.toLowerCase()}/${app.position.toLowerCase()}/reviews`);

  };
  const goToEdit = () => {
    navigate('/edit-opportunity');
  }
  const goToViewApplications= () => {
    navigate('/view-applicants');
  }


  return (
    <Card className="mb-2 shadow-sm" style={{ cursor: 'pointer'}}>
      <Card.Body>
        <Row className="align-items-center">
          <Col style={{textAlign: "left"}}>
            <h5 style={{fontSize: "26px", fontFamily: 'Roboto'}}>{app.position}</h5>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Company:</strong> {app.company} </p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Duration:</strong> {app.duration}</p>
            <p className="mb-1" style={{fontSize:"16px", color:"#666666"}}><strong>Location:</strong> {app.location}</p>
            <div className="d-flex flex-column flex-md-row align-items-start gap-3" style={{color: "black", fontSize: "13px", marginTop:"10px"}}>
              <button style={{ padding: '4px 8px', fontSize: '12px', border:"white" }} type="button" className="btn btn-outline-warning" onClick={goToOpportunityDetails}>View Details</button>
              <button style={{ padding: '4px 8px', fontSize: '11px', color: "white"}} type="button" className="btn btn-warning rounded-pill px-1" onClick={goToViewApplications}>View Applications</button>
              <button style={{ padding: '4px 8px', fontSize: '12px' ,color: "white"}} type="button" className="btn btn-warning rounded-pill px-1" onClick={goToViewReviews}>View Ratings</button>
              <button style={{ padding: '4px 8px', fontSize: '12px' ,color: "white"}} type="button" className="btn btn-warning rounded-pill px-1" onClick={goToEdit}>Edit</button>

            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackApplicationCard;
