import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Confirmation from './Confirmation.js';  // Confirmation modal component
import WithLabelExample from './ProgressBar.js'
import { useNavigate, useParams } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";

import { opportunities } from '../Data/dummyData';


function GeneralInformationForm() {
    const navigate = useNavigate();

    const { id } = useParams();
    const opportunity = opportunities.find(o => o.id === parseInt(id));

    // Form states
    const [availability, setAvailability] = useState('');
    const [fullTimeInterest, setFullTimeInterest] = useState('');
    const [relocation, setRelocation] = useState('');
    const [whyInterested, setWhyInterested] = useState('');
    const [skills, setSkills] = useState('');
    const [careerGoals, setCareerGoals] = useState('');


    // Form error states
    const [errors, setErrors] = useState({});

    // Modal and Alert visibility states
    const [showModal, setShowModal] = useState(false);
    const [showAcceptAlert, setShowAcceptAlert] = useState(false);


    // Handle modal close
    const handleClose = () => setShowModal(false);

    // Handle modal save (confirmation)
    const handleSave = () => {
        handleClose(); // Close the modal after saving

        // Show success alert
        setShowAcceptAlert(true);
        setTimeout(() => {
            // Hide alert after 3 seconds

            setShowAcceptAlert(false);

            navigate('/track-applications')

        }, 2000);


        // Reset form fields
        setAvailability('');
        setFullTimeInterest('');
        setRelocation('');
        setWhyInterested('');
        setSkills('');
        setCareerGoals('');

    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        let formErrors = {};
        let valid = true;

        if (!availability) {
            formErrors.availability = 'Availability is required';
            valid = false;
        }
        if (!fullTimeInterest) {
            formErrors.fullTimeInterest = 'Full-time interest is required';
            valid = false;
        }
        if (!relocation) {
            formErrors.relocation = 'Relocation status is required';
            valid = false;
        }
        if (!whyInterested) {
            formErrors.whyInterested = 'Reason for interest is required';
            valid = false;
        }
        if (!skills) {
            formErrors.skills = 'Skills description is required';
            valid = false;
        }
        if (!careerGoals) {
            formErrors.careerGoals = 'Career goals description is required';
            valid = false;
        }

        setErrors(formErrors);

        if (valid) {
            setShowModal(true);  // Show confirmation modal
            console.log("here")
        }

    };


    const handleBack = () => {
        navigate('/contact-informationForm');
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Internship Application</h1>
            <h2 className="text-center">
  {opportunity ? `${opportunity.company} - ${opportunity.title}` : 'Internship Opportunity'}
</h2>
            <WithLabelExample now={70} />

            <br />

            <h4 style={{ marginBottom: '20px' }}>Further Details</h4>

            <div
                style={{
                    position: "fixed",
                    top: "100px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    width: "50%",
                }}
            >
                {showAcceptAlert && (
                    <Alert
                        variant="success"
                        onClose={() => setShowAcceptAlert(false)}
                        dismissible
                    >
                        Application submitted successfully!
                    </Alert>
                )}
            </div>

            {/* Contact Information Form */}
            <Form onSubmit={handleSubmit}>
                {/* Written Questions */}

                {/* Why Interested */}
                <Form.Group controlId="whyInterested" className="mb-4">
                    <Form.Label>Why are you interested in applying for this internship?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={whyInterested}
                        onChange={(e) => setWhyInterested(e.target.value)}
                        isInvalid={!!errors.whyInterested}
                    />
                    <Form.Control.Feedback type="invalid">{errors.whyInterested}</Form.Control.Feedback>
                </Form.Group>

                {/* Skills */}
                <Form.Group controlId="skills" className="mb-4">
                    <Form.Label>What skills or experiences make you a strong candidate for this internship?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        isInvalid={!!errors.skills}
                    />
                    <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
                </Form.Group>

                {/* Career Goals */}
                <Form.Group controlId="careerGoals" className="mb-4">
                    <Form.Label>What are your long-term career goals, and how do you see this internship contributing to those goals?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={careerGoals}
                        onChange={(e) => setCareerGoals(e.target.value)}
                        isInvalid={!!errors.careerGoals}
                    />
                    <Form.Control.Feedback type="invalid">{errors.careerGoals}</Form.Control.Feedback>
                </Form.Group>

                <hr />

                <h4 style={{ marginBottom: '20px' }}>Internship Preferences</h4>

                {/* Availability to Start */}
                <Form.Group controlId="availability" className="mb-4">
                    <Form.Label>Are you currently available to start the internship?</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Yes"
                        name="availability"
                        value="Yes"
                        checked={availability === 'Yes'}
                        onChange={(e) => setAvailability(e.target.value)}
                        isInvalid={!!errors.availability}
                    />
                    <Form.Check
                        type="radio"
                        label="No"
                        name="availability"
                        value="No"
                        checked={availability === 'No'}
                        onChange={(e) => setAvailability(e.target.value)}
                        isInvalid={!!errors.availability}
                    />
                    <Form.Check
                        type="radio"
                        label="Maybe (Select if unsure)"
                        name="availability"
                        value="Maybe"
                        checked={availability === 'Maybe'}
                        onChange={(e) => setAvailability(e.target.value)}
                        isInvalid={!!errors.availability}
                    />
                    <Form.Control.Feedback type="invalid">{errors.availability}</Form.Control.Feedback>
                </Form.Group>

                {/* Full-Time Interest */}
                <Form.Group controlId="fullTimeInterest" className="mb-4">
                    <Form.Label>If you perform well during the internship, would you be interested in transitioning to a full-time position after graduation?</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Yes"
                        name="fullTimeInterest"
                        value="Yes"
                        checked={fullTimeInterest === 'Yes'}
                        onChange={(e) => setFullTimeInterest(e.target.value)}
                        isInvalid={!!errors.fullTimeInterest}
                    />
                    <Form.Check
                        type="radio"
                        label="No"
                        name="fullTimeInterest"
                        value="No"
                        checked={fullTimeInterest === 'No'}
                        onChange={(e) => setFullTimeInterest(e.target.value)}
                        isInvalid={!!errors.fullTimeInterest}
                    />
                    <Form.Control.Feedback type="invalid">{errors.fullTimeInterest}</Form.Control.Feedback>
                </Form.Group>


                {/* Relocation */}
                <Form.Group controlId="relocation" className="mb-4">
                    <Form.Label>Are you open to relocating for the internship, if required?</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Yes"
                        name="relocation"
                        value="Yes"
                        checked={relocation === 'Yes'}
                        onChange={(e) => setRelocation(e.target.value)}
                        isInvalid={!!errors.relocation}
                    />
                    <Form.Check
                        type="radio"
                        label="No"
                        name="relocation"
                        value="No"
                        checked={relocation === 'No'}
                        onChange={(e) => setRelocation(e.target.value)}
                        isInvalid={!!errors.relocation}
                    />
                    <Form.Check
                        type="radio"
                        label="Maybe (depending on the location)"
                        name="relocation"
                        value="Maybe"
                        checked={relocation === 'Maybe'}
                        onChange={(e) => setRelocation(e.target.value)}
                        isInvalid={!!errors.relocation}
                    />
                    <Form.Control.Feedback type="invalid">{errors.relocation}</Form.Control.Feedback>
                </Form.Group>


                {/* Buttons */}
                <Form.Group className="mb-4 d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleBack} style={{ color: 'black', width: '120px', marginRight: '10px' }}>Back</Button>
                    <Button variant="primary" type="submit" style={{ width: '120px' }} >Submit</Button>
                </Form.Group>
            </Form>

            {/* Confirmation Modal */}
            <Confirmation
                show={showModal}
                onHide={handleClose}
                title="Confirmation"
                bodyText="Do you want to submit this internship opportunity?"
                closeButtonLabel="Cancel"
                saveButtonLabel="Yes, Submit"
                onSave={handleSave}
            />
        </Container>
    );
}

export default GeneralInformationForm;
