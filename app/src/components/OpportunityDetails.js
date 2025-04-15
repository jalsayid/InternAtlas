import '../OpportunityDetails.css';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

/* 
important:
    make sure to import booststrap in index.js
*/


function OpportunityDetails() {
    const navigate = useNavigate();
  
    const goToTrackApplications = () => {
      navigate('/TrackApplicationsCompany');
    };
  
    return (
      <div className="OpportunityDetails text-start">
        <div className="header py-4">
          <Container>
            <Row>
              <Col>
                <h1>Software Engineering Intern</h1>
                <p>By <strong>Sabic</strong></p>
                <p id="subp">
                  Location <strong>Dammam</strong>
                  <span className="separator"></span>|
                  <span className="separator"></span>
                  Duration: Summer 2025 (<strong>3 months</strong>)
                </p>
              </Col>
            </Row>
          </Container>
        </div>
  
        <div className="content py-4">
          <Container>
            <Row className="mb-4">
              <Col>
                <h3>Description</h3>
                <p>
                SABIC's Software Engineering Internship provides students and recent graduates with hands-on experience in IT and technology-driven projects. Interns collaborate on software development, IT infrastructure, and cybersecurity initiatives, gaining exposure to real-world business applications. The program focuses on problem-solving, system analysis, and implementing innovative solutions while working alongside industry experts. Ideal candidates are those pursuing degrees in Computer Science, Software Engineering, or related fields, with strong analytical and teamwork skills. For the latest opportunities, visit SABIC Careers.
                </p>
              </Col>
            </Row>
  
            <Row className="mb-4">
              <Col>
                <h3>Qualifications:</h3>
                <ul className='ps-0 ms-0'>
                    <li>Educational Background: Pursuing a Bachelor's  in Computer Science, Software Engineering, Cyber Security, or a closely related discipline.</li>
                    <li>Academic Performance: A minimum GPA of 3.0 on a 4.0 scale is often preferred.</li>
                    <li>Technical Proficiency: Demonstrated skills in programming languages such as Python or Java</li>
                    <li>Analytical and Problem-Solving Skills: Ability to analyze complex technical data and develop effective solutions.</li>
                    <li>Team Collaboration: Ability to work effectively both independently and as part of a team.</li>
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
  