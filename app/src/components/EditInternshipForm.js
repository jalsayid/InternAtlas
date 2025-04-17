import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Confirmation from './Confirmation';
import Alter from './Alert';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaFileAlt, FaMapMarkerAlt, FaClipboardCheck, FaGraduationCap, FaTasks } from 'react-icons/fa';

const EditInternshipForm = ({ internship, onSaveChanges }) => {
    const navigate = useNavigate();

    //Dummy data of the post
    const initialInternship = {
        title: 'Software Engineering Internship',
        description: 'A challenging internship for budding engineers.',
        location: 'Riyadh',
        requirements: 'Strong programming skills in Java, Python.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field.',
        responsibilities: 'Assist in software development, debugging, and testing.'
    };

    const [title, setTitle] = useState(initialInternship.title || '');
    const [description, setDescription] = useState(initialInternship.description || '');
    const [location, setLocation] = useState(initialInternship.location || '');
    const [requirements, setRequirements] = useState(initialInternship.requirements || '');
    const [qualifications, setQualifications] = useState(initialInternship.qualifications || '');
    const [responsibilities, setResponsibilities] = useState(initialInternship.responsibilities || '');

    // state to store error messages
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        location: '',
        requirements: '',
        qualifications: '',
        responsibilities: ''
    });


    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const handleClose = () => setShowModal(false);

    // (confirmation)
    const handleSave = () => {
        handleClose(); // Close the modal after saving

        // Show success alert
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/dashboard/company');

        }, 2500); // Delay navigation to show alert

    };

    // Handlers to update state on input change
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleRequirementsChange = (event) => setRequirements(event.target.value);
    const handleQualificationsChange = (event) => setQualifications(event.target.value);
    const handleResponsibilitiesChange = (event) => setResponsibilities(event.target.value);

    // Handle form 
    const handleSaveChanges = (event) => {
        event.preventDefault();

        const newErrors = {};
        let isValid = true;

        if (!title) {
            newErrors.title = 'Title is required';
            isValid = false;
        }
        if (!description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
        if (!location) {
            newErrors.location = 'Location is required';
            isValid = false;
        }
        if (!requirements) {
            newErrors.requirements = 'Requirements are required';
            isValid = false;
        }
        if (!qualifications) {
            newErrors.qualifications = 'Qualifications are required';
            isValid = false;
        }
        if (!responsibilities) {
            newErrors.responsibilities = 'Responsibilities are required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setShowModal(true);

            {/*onSaveChanges({
                title,
                description,
                location,
                requirements,
                qualifications,
                responsibilities
                });*/}
        }
    };

    return (
        <Container className="mt-5">
            <h2>Edit Internship Opportunity</h2>
            <br/>

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
                <Alter
                    show={showAlert}
                    message="Application is updated successfully!"
                    variant="success"
                    onClose={() => setShowAlert(false)}
                />
            </div>

            <Form onSubmit={handleSaveChanges}>
                {/* Title */}
                <Form.Group controlId="formTitle" className="mb-4">
                    <Form.Label><FaPen /> Internship Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter internship title"
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Description */}
                <Form.Group controlId="formDescription" className="mb-4">
                    <Form.Label><FaFileAlt /> Internship Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter internship description"
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Location */}
                <Form.Group controlId="formLocation" className="mb-4">
                    <Form.Label><FaMapMarkerAlt /> Location</Form.Label>
                    <Form.Control
                        type="text"
                        rows={3}
                        value={location}
                        onChange={handleLocationChange}
                        placeholder='Country-Region-City'
                        isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                </Form.Group>

                {/* Requirements */}
                <Form.Group controlId="formRequirements" className="mb-4">
                    <Form.Label><FaClipboardCheck /> Requirements</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={requirements}
                        onChange={handleRequirementsChange}
                        placeholder="Enter internship requirements"
                        isInvalid={!!errors.requirements}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.requirements}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Qualifications */}
                <Form.Group controlId="formQualifications" className="mb-4">
                    <Form.Label><FaGraduationCap /> Qualifications</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={qualifications}
                        onChange={handleQualificationsChange}
                        placeholder="Enter internship qualifications"
                        isInvalid={!!errors.qualifications}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.qualifications}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Responsibilities */}
                <Form.Group controlId="formResponsibilities" className="mb-4">
                    <Form.Label><FaTasks /> Responsibilities</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={responsibilities}
                        onChange={handleResponsibilitiesChange}
                        placeholder="Enter internship responsibilities"
                        isInvalid={!!errors.responsibilities}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.responsibilities}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Save Button */}
                <Form.Group className="mb-4 d-flex justify-content-end">
                    <Button style={{ width: '120px' }} variant="primary" type="submit">
                        Save
                    </Button>
                </Form.Group>

            </Form>

            {/* Confirmation Modal */}
            <Confirmation
                show={showModal}
                onHide={handleClose}
                title="Confirmation"
                bodyText="Do you want to update this internship opportunity?"
                closeButtonLabel="Cancel"
                saveButtonLabel="Yes, Submit"
                onSave={handleSave}
            />

        </Container>
    );
};

export default EditInternshipForm;
