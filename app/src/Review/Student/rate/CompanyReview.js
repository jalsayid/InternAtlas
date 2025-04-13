import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import './CompanyReview.css';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../StudentNavBar';
import { reviewData } from '../../../Data/reviews';


const CompanyReview = () => {
    const { companyName } = useParams();
    const navigate = useNavigate();


    const reviews = reviewData[companyName.toLowerCase()] || [];

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <StarFill
                key={i}
                className={`me-1 ${i < count ? 'text-warning' : 'text-secondary'}`}
            />
        ));
    };

    return (
        <>
            <NavBar />

            <Container className="py-4">
                <a href="/" className="text-muted mb-3 d-inline-block">
                    &larr; Back to search
                </a>



                <div className="d-flex align-items-center mt-3 mb-4">
                    <i className="bi bi-building fs-3 text-secondary me-3"></i>
                    <div>
                        <h5 className="mb-0">{companyName}</h5>
                        <small className="text-muted">Software Engineering Intern</small>
                    </div>
                    <div className="ms-auto text-primary d-flex align-items-center">
                        <span className="me-1 fs-5 fw-semibold">4.5</span>
                        <StarFill className="text-warning" />
                    </div>
                </div>


                <Row className="mb-3">
                    <Col xs={6} md={3}><p><strong>Reputation</strong> {renderStars(4)}</p></Col>
                    <Col xs={6} md={3}><p><strong>Social</strong> {renderStars(5)}</p></Col>
                    <Col xs={6} md={3}><p><strong>Opportunities</strong> {renderStars(4)}</p></Col>
                    <Col xs={6} md={3}><p><strong>Location</strong> {renderStars(4)}</p></Col>
                </Row>


                <Button
                    variant="dark"
                    className="mb-4"
                    onClick={() => navigate(`/company/${companyName}/write-review`)}
                >
                    Write a review
                </Button>


                <h5 className="mb-3">Recent Reviews</h5>

                {reviews.length === 0 && (
                    <p className="text-muted">No reviews yet. Be the first to write one!</p>
                )}

                {reviews.map((review, index) => (
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

                ))}
            </Container>
        </>
    );
};

export default CompanyReview;
