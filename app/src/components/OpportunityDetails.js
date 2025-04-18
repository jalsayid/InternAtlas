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
                  <li key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
  
            <Row className="mb-4">
              <Col>
                <h3>Responsibilities:</h3>
                <ul className='ps-0 ms-0'>
                    <li>Collaborating on Software Development Projects: Participate in the analysis, design, implementation, and testing phases of software projects, working closely with IT and business teams to gather requirements and develop effective solutions.</li>
                    <li>Assisting with IT Infrastructure Initiatives: Support the deployment and maintenance of IT infrastructure, including VoIP telephony, video conferencing, and collaboration tools, ensuring seamless communication and operational efficiency.</li>                        <li>Conducting Research and Development: Engage in research activities related to process technology development, polymer synthesis, and the characterization of new materials, applying scientific principles to real-world challenges.</li>
                    <li>Ensuring Compliance and Safety: Adhere to all applicable work processes and safety protocols, contributing to a safe and compliant working environment.</li>
                    <li>Documenting and Reporting: Prepare detailed documentation, including policies, procedures, and technical reports, to support project implementation and knowledge sharing within the team.</li>

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
  