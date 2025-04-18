import '../OpportunityDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { applicationsForCompany } from '../dummyData';


function OpportunityDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const opportunity = applicationsForCompany.find(op => op.id === parseInt(id));

  
    const goToTrackApplications = () => {
      navigate('/company/applications');
    };
  
    return (
      <div className="OpportunityDetails text-start">
        <div className="header py-4">
          <Container>
            <Row>
              <Col>
                <h1>{opportunity.position}</h1>
                <p>By <strong>{opportunity.company}</strong></p>
                <p id="subp">
                  Location <strong>{opportunity.location}</strong>
                  <span className="separator"></span>|
                  <span className="separator"></span>
                  Duration: (<strong>{opportunity.duration}</strong>)
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
                  {opportunity.qualifications.split('\n').map((item, index) => (
                  <li className='greenCheck' key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
  
            <Row className="mb-4">
              <Col>
                <h3>Responsibilities:</h3>
                <ul className='ps-0 ms-0'>
                {opportunity.responsibilities.split('\n').map((item, index) => (
                  <li className='greenCheck' key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
  
            <Row>
              <Col className="text-end">
                <Button variant="outline-warning" onClick={goToTrackApplications}>
                  Back
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
  
  export default OpportunityDetails;
  