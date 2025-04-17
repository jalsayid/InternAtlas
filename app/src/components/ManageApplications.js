import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import ApplicationCardAdmin from './ApplicationCardAdmin.js';
import { applications } from '../dummyData'; 
import Confirmation from './Confirmation.js';
import SubmissionAlert from './Alert.js';



function ManageApplications() {
  const [search, setSearch] = useState("");
  const [application, setApplication] = useState(applications);


  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const filtered = application.filter(app =>
    app.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);

      
    };
    const confirmDeletion = () => {
      const updated = application.filter(app => app.id !== pendingDeleteId);
      setApplication(updated);
      setShowConfirm(false);
      setPendingDeleteId(null);
    

      setShowAlert(true);
    
      setTimeout(() => setShowAlert(false), 3000); 
    };
    

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="mb-4 text-center" style={{fontFamily: 'Roboto', fontSize: "40px"}}>Internship Opportunities posted</h2>
      <Form className="mb-3 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search for an application"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:"300px", margin: "20px 20px"}}
        />
      </Form>
      <SubmissionAlert
        show={showAlert}
        message="Application deleted successfully"
        variant="success"
        onClose={() => setShowAlert(false)}
      />

      {filtered.map(app => (
        <ApplicationCardAdmin
          key={app.id}
          app={app}
          onDelete={handleDelete}
        />
      ))}
      <Confirmation
        show={showConfirm}
        onHide={() => {
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
        title="Confirm Deletion"
        bodyText="Are you sure you want to delete this application?"
        closeButtonLabel="Cancel"
        saveButtonLabel="Delete"
        onSave={confirmDeletion}
      />
    </Container>
  );
}

export default ManageApplications;