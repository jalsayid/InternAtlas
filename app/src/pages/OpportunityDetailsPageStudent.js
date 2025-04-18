import '../OpportunityDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { opportunities } from '../Data/dummyData';

function OpportunityDetailsPagesStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const opportunity = opportunities.find(o => o.id === parseInt(id));

  if (!opportunity) return <p>Opportunity not found.</p>;

  const handleApply = () => {
    navigate(`/contact-informationForm/${id}`);
  };

  const handleBack = () => {
    navigate('/search-opportunities');
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
                Type: <strong>{opportunity.type}</strong>
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
              <p>{opportunity.description}</p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h3>Qualifications:</h3>
              <ul className="ps-0 ms-0">
                {opportunity.qualifications?.split('\n').filter(q => q.trim()).map((q, idx) => (
                  <li key={idx} style={{ listStyle: 'none', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'green', marginRight: '0.5rem' }}></span>{q.trim()}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h3>Responsibilities:</h3>
              <ul className="ps-0 ms-0">
                {opportunity.responsibilities?.split('\n').filter(r => r.trim()).map((r, idx) => (
                  <li key={idx} style={{ listStyle: 'none', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'green', marginRight: '0.5rem' }}></span>{r.trim()}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-between">
              <button className='second-btn' onClick={handleBack}>Back</button>
              <button className='def-btn' onClick={handleApply}>Apply</button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default OpportunityDetailsPagesStudent;
