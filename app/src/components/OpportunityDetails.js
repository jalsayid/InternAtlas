import '../OpportunityDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function OpportunityDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [opportunity, setOpportunity] = useState(null);
    // const opportunity = applicationsForCompany.find(op => op.id === parseInt(id));
    useEffect(() => {
      fetch(`http://localhost:3001/api/internships/id/${id}`)
        .then(res => res.json())
        .then(data => setOpportunity(data))
        .catch(err => console.error("Failed to fetch opportunity:", err));
    }, [id]);
  
    const goToTrackApplications = () => {
      navigate('/company/applications');
    };

    if (!opportunity) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', flexDirection: 'column' }}>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    };
  
    return (
      <div className="OpportunityDetails text-start">
        <div className="header py-4">
          <Container>
            <Row>
              <Col>
                <h1>{opportunity.title}</h1>
                <p>By <strong>{opportunity.company}</strong></p>
                <p id="subp">
                  Location <strong>{opportunity.location}</strong>
                  <span className="separator"></span>|
                  <span className="separator"></span>
                  Duration: (<strong>{opportunity.type}</strong>)
                </p>
              </Col>
            </Row>
          </Container>
        </div>
  
        <div className="content py-4" style={{background:"white"}}>
          <Container>
            <Row className="mb-4">
              <Col>
                <h3>Description</h3>
                <p>
                {opportunity.description}
                </p>
              </Col>
            </Row>
  
            <Row className="mb-4">
              <Col>
                <h3>Qualifications:</h3>
                <ul className='ps-0 ms-0'>
                  {opportunity.qualifications.split(';').map((item, index) => (
                  <li className='greenCheck' key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
  
            <Row className="mb-4">
              <Col>
                <h3>Responsibilities:</h3>
                <ul className='ps-0 ms-0'>
                {opportunity.responsibilities.split(';').map((item, index) => (
                  <li className='greenCheck' key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
  
            <Row>
              <Col className="text-end">
                <button className='second-btn' onClick={goToTrackApplications}>
                  Back
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
  
  export default OpportunityDetails;
  