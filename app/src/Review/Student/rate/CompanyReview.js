import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import './CompanyReview.css';
import { useNavigate, useParams } from 'react-router-dom';
import StudentNavBar from '../../../StudentNavBar'; 
import { reviewData } from '../../../Data/reviews';
import { opportunities } from '../../../Data/dummyData';


const CompanyReview = () => {
    const { companyName } = useParams();
    const navigate = useNavigate();

    const companyKey = companyName.toLowerCase();
    const reviews = reviewData[companyKey] || [];

    const matchedOpportunity = opportunities.find(
        (op) => op.company.toLowerCase() === companyKey
    );
    const positionTitle = matchedOpportunity ? matchedOpportunity.title : "Internship Opportunity";

    const renderStars = (count) =>
        [...Array(5)].map((_, i) => (
            <StarFill
                key={i}
                className={`me-1 ${i < count ? 'text-warning' : 'text-secondary'}`}
            />
        ));

    return (
        <>
            <StudentNavBar />

            <Container className="py-4">
                

                {/* Company Header */}
                <div className="d-flex align-items-center mt-3 mb-4">
                    <i className="bi bi-building fs-3 text-secondary me-3"></i>
                    <div>
                        <h5 className="mb-0 text-capitalize company-name">{companyName}</h5>
                        <small className="text-muted">{positionTitle}</small>
                    </div>
                    <div className="ms-auto text-primary d-flex align-items-center">
                        <span className="me-1 fs-5 fw-semibold">4.5</span>
                        <StarFill className="text-warning" />
                    </div>
                </div>

                {/* Category Ratings */}
                <Row className="mb-3 flex-wrap">
                    <Col xs={6} md={3}><p><strong className="rating-label">Reputation</strong> {renderStars(4)}</p></Col>
                    <Col xs={6} md={3}><p><strong className="rating-label">Social</strong> {renderStars(5)}</p></Col>
                    <Col xs={6} md={3}><p><strong className="rating-label">Opportunities</strong> {renderStars(4)}</p></Col>
                    <Col xs={6} md={3}><p><strong className="rating-label">Location</strong> {renderStars(4)}</p></Col>
                </Row>

                <button
                    className="mb-4 btn-rectangle second-btn"
                    onClick={() => navigate(`/company/${companyName}/write-review`)}
                >
                    Write a review
                </button>

                {/* Reviews Section */}
                <h5 className="mb-3">Recent Reviews</h5>

                {reviews.length === 0 ? (
                    <p className="text-muted">No reviews yet. Be the first to write one!</p>
                ) : (
                    reviews.map((review, index) => (
                        <Card className="mb-3 shadow-sm rounded-4" key={index}>
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex mb-2">
                                    <i className="bi bi-person-circle fs-2 text-secondary me-3"></i>
                                    <div className="w-100">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="fw-semibold">Anonymous Student</span>
                                            <div>{renderStars(review.rating)}</div>
                                        </div>
                                        <p className="mb-1 text-muted">{review.text}</p>

                                        {review.companyResponse && (
                                            <div className="bg-light border rounded p-3 mt-2">
                                                <strong className="d-block mb-1">Company Response:</strong>
                                                <span>{review.companyResponse}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
        </>
    );
};

export default CompanyReview;
