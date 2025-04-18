import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';



function TrackApplicationCard({ app }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const goToOpportunityDetails = () => {
    navigate(`/OpportunityDetails/${app.id}`);
  };
  const goToViewReviews = () => {
    navigate(`/CompanyReview/${app.company.toLowerCase()}/${app.position.toLowerCase()}/reviews`);

  };
  const goToEdit = (id) => {
    console.log(id); // Debugging: check the value of id
    navigate(`/edit-opportunity/${app.id}`);
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
              <button className="third-btn" style={{ padding: '4px 8px', fontSize: '14px', borderRadius: '20px', minWidth: '120px' }} onClick={goToOpportunityDetails}>View Details</button>
              <button className="third-btn" style={{ padding: '4px 8px', fontSize: '14px', borderRadius: '20px', minWidth: '120px' }} onClick={goToViewApplications}>View Applicants</button>
              <button className="third-btn" style={{ padding: '4px 8px', fontSize: '14px', borderRadius: '20px', minWidth: '120px' }} onClick={goToViewReviews}>View Ratings</button>
              <button className="third-btn" style={{ padding: '4px 8px', fontSize: '14px', borderRadius: '20px', minWidth: '120px' }} onClick={goToEdit}>Edit</button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackApplicationCard;
