import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackProfilesCard from './TrackProfilesCard.js';
import ProfileDetailModal from './ProfileDetailModal.js';
import Confirmation from './Confirmation.js';
import SubmissionAlert from './Alert.js';



function TrackProfiles() {
    const [selected, setSelected] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [search, setSearch] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

        // Fetch data from API
        useEffect(() => {
          fetch(`https://internatlas.onrender.com/api/companiesdata`) // Adjust if hosted elsewhere
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data)) {
                setProfiles(data);
              } else {
                setProfiles([]);
              }
            })
            .catch(err => console.error("Failed to fetch company data", err))
            .finally(() => setLoading(false));
        }, []);

    const handleDelete = (id) => {
      setPendingDeleteId(id);
      setShowConfirm(true);

      };
      const confirmDeletion = () => {
        fetch(`https://internatlas.onrender.com/api/companiesdata/${pendingDeleteId}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete company profile");
            const updated = profiles.filter(app => app.companyName !== pendingDeleteId);
            setProfiles(updated);
            setShowAlert(true);
          })
          .catch(err => console.error("Error during deletion:", err))
          .finally(() => {
            setShowConfirm(false);
            setPendingDeleteId(null);
            setTimeout(() => setShowAlert(false), 3000);
          });      
        };

  const filtered = profiles.filter(app =>
    app.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
              <h2 className="page-title" style={{ fontFamily: 'Roboto' }}>
              Companies Profile</h2>
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
        message="Profile deleted successfully"
        variant="success"
        onClose={() => setShowAlert(false)}
      />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : ( 
        filtered.length === 0 ? (
          <p className="text-center">No matching profiles found.</p>
        ) : (
        filtered.map(app => (
          <TrackProfilesCard
            key={app._id}
            app={app}
            onClick={(data) => {
              setSelected(data);
              setShowDetail(true);
            }}
            onDelete={handleDelete}
          />
        ))
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