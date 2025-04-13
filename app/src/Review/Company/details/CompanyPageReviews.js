import React, { useState } from 'react';
import { Container, Card, Button, Alert, Form } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import CompanyNavBar from '../CompanyNavBar';
import './CompanyPageReview.css';

const CompanyPageReviews = () => {
    const initialReviews = [
        {
            id: 1,
            rating: 5,
            text: 'Great mentorship and a healthy work-life balance.',
            response: 'Thank you! We enjoyed having you on the team.',
        },
        {
            id: 2,
            rating: 3,
            text: 'I wish there were more social events.',
            response: null,
        },
    ];

    const [reviews, setReviews] = useState(
        initialReviews.map((r) => ({
            ...r,
            isEditing: false,
            editText: r.response || '',
        }))
    );

    const toggleEditing = (id) => {
        setReviews((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, isEditing: !r.isEditing } : r
            )
        );
    };

    const handleResponseChange = (id, text) => {
        setReviews((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, editText: text } : r
            )
        );
    };

    const handleSave = (id) => {
        setReviews((prev) =>
            prev.map((r) =>
                r.id === id
                    ? { ...r, response: r.editText, isEditing: false }
                    : r
            )
        );
    };

    const handleDelete = (id) => {
        setReviews((prev) =>
            prev.map((r) =>
                r.id === id
                    ? { ...r, response: null, editText: '', isEditing: false }
                    : r
            )
        );
    };

    const renderStars = (count) =>
        [...Array(5)].map((_, i) => (
            <StarFill
                key={i}
                className={`me-1 ${i < count ? 'text-warning' : 'text-secondary'}`}
            />
        ));

    return (
        <>
            <CompanyNavBar />
            <Container className="py-4">
                {/* Company Profile */}
                <div className="d-flex align-items-center mb-4">
                    <i className="bi bi-building fs-3 me-3 text-secondary"></i>
                    <div>
                        <h5 className="mb-0">Google</h5>
                        <small className="text-muted">Software Engineering Intern</small>
                    </div>
                    <div className="ms-auto text-primary d-flex align-items-center">
                        <span className="me-1 fs-5 fw-semibold">4.5</span>
                        <StarFill className="text-warning" />
                    </div>
                </div>

                {/* Ratings Summary */}
                <div className="mb-4 d-flex flex-wrap gap-4">
                    <div><strong>Reputation</strong> {renderStars(4)}</div>
                    <div><strong>Social</strong> {renderStars(5)}</div>
                    <div><strong>Opportunities</strong> {renderStars(4)}</div>
                    <div><strong>Location</strong> {renderStars(4)}</div>
                </div>

                <h5 className="mb-3">Student Reviews</h5>

                {/* Reviews */}
                {reviews.map((r) => (
                    <Card key={r.id} className="mb-3">
                        <Card.Body>
                            <p className="fw-bold">Anonymous Student</p>
                            <div className="mb-2">{renderStars(r.rating)}</div>
                            <p>{r.text}</p>

                            {/* Editing Mode */}
                            {r.isEditing ? (
                                <>
                                    <Alert variant="light" className="mb-3">
                                        <strong>Guidelines:</strong>
                                        <ul className="mb-0">
                                            <li>Keep your tone professional and respectful.</li>
                                            <li>Responses are visible to students for transparency.</li>
                                            <li>Inappropriate content will be reviewed by the admin.</li>
                                        </ul>
                                    </Alert>

                                    <Form>
                                        <Form.Group className="mb-2">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Write your response here..."
                                                value={r.editText}
                                                onChange={(e) =>
                                                    handleResponseChange(r.id, e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleSave(r.id)}
                                            disabled={!r.editText.trim()}
                                        >
                                            💾 Save
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => toggleEditing(r.id)}
                                        >
                                            ❌ Cancel
                                        </Button>
                                    </Form>
                                </>
                            ) : r.response ? (
                                // Response Exists
                                <div className="bg-light p-3 rounded">
                                    <strong>Your Response:</strong>
                                    <p className="mb-2">{r.response}</p>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => toggleEditing(r.id)}
                                    >
                                        ✏️ Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(r.id)}
                                    >
                                        🗑️ Delete
                                    </Button>
                                </div>
                            ) : (
                                // No Response Yet
                                <Button
                                    variant="warning"
                                    onClick={() => toggleEditing(r.id)}
                                >
                                    Respond
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </>
    );
};

export default CompanyPageReviews;
