import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackProfilesCard from './TrackProfilesCard.js';
import { companyProfiles } from '../dummyData'; 
import ProfileDetailModal from './ProfileDetailModal.js';
import Confirmation from './Confirmation.js';
import SubmissionAlert from './Alert.js';



function TrackProfiles() {
    const [selected, setSelected] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [search, setSearch] = useState("");
    const [profiles, setProfiles] = useState(companyProfiles);

    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = (id) => {
      setPendingDeleteId(id);
      setShowConfirm(true);

      };
      const confirmDeletion = () => {
        const updated = profiles.filter(profile => profile.id !== pendingDeleteId);
        setProfiles(updated);
        setShowConfirm(false);
        setPendingDeleteId(null);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      };    

  const filtered = profiles.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="mb-4 text-center" style={{fontFamily: 'Roboto', fontSize: "40px"}}>Companies Profile</h2>
      <Form className="mb-3 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search for a company"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:"300px", margin: "20px 20px"}}
        />
      </Form>
      <SubmissionAlert
        show={showAlert}
        message="item deleted successfully"
        variant="success"
        onClose={() => setShowAlert(false)}
      />

      {filtered.map(app => (
        <TrackProfilesCard
          key={app.id}
          app={app}
          onClick={(data) => {
            setSelected(data);
            setShowDetail(true);
          }}
          onDelete={handleDelete}
        />
      ))}
      <ProfileDetailModal
        show={showDetail}
        handleClose={() => setShowDetail(false)}
        app={selected}
      />
      <Confirmation 
        show={showConfirm}
        onHide={() => {
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
        title="Confirm Deletion"
        bodyText="Are you sure you want to delete this profile?"
        closeButtonLabel="Cancel"
        saveButtonLabel="Delete"
        onSave={confirmDeletion}
      />
      



    </Container>
  );
}

export default TrackProfiles;