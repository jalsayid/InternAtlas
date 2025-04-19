import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackCommentsCard from './TrackCommentsCard.js';
import { invalidCompanyRatings } from '../dummyData'; 
import Confirmation from './Confirmation.js'; 
import SubmissionAlert from './Alert.js';


function TrackComments() {
    const [search, setSearch] = useState("");
    const [comments, setCommenents] = useState(invalidCompanyRatings);

    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);


    const handleDelete = (id) => {
      setPendingDeleteId(id);
      setShowConfirm(true);

      };
      const confirmDeletion = () => {
        const updated = comments.filter(comment => comment.id !== pendingDeleteId);
        setCommenents(updated);
        setShowConfirm(false);
        setPendingDeleteId(null);
      
        
        setShowAlert(true);
      
        
        setTimeout(() => setShowAlert(false), 3000);
      };
      
    

  const filtered = comments.filter(app =>
    app.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
              <h2 className="page-title" style={{ fontFamily: 'Roboto' }}>
              Reported Comments</h2>
      <Form className="mb-3 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search for a user"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:"300px", margin: "20px 20px"}}
        />
      </Form>
      <SubmissionAlert
        show={showAlert}
        message="Comment deleted successfully"
        variant="success"
        onClose={() => setShowAlert(false)}
      />


      {filtered.map(app => (
        <TrackCommentsCard
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
        bodyText="Are you sure you want to delete this comment?"
        closeButtonLabel="Cancel"
        saveButtonLabel="Delete"
        onSave={confirmDeletion}
      />  

      


    </Container>
  );
}

export default TrackComments;