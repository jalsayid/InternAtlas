import React, { useState , useEffect} from 'react';
import { Container, Form } from 'react-bootstrap';
import ApplicationCardAdmin from './ApplicationCardAdmin.js';
import Confirmation from './Confirmation.js';
import SubmissionAlert from './Alert.js';


function ManageApplications() {
  const [search, setSearch] = useState("");
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

   // Fetch data from API
   useEffect(() => {
    fetch(`${REACT_APP_API_URL}/api/internships`) // Adjust if hosted elsewhere
      .then(res => res.json())
      .then(data => setApplication(data))
      .catch(err => console.error("Failed to fetch applications", err))
      .finally(() => setLoading(false));
  }, []);


  const filtered = application.filter(app =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDeletion = () => {
    fetch(`${REACT_APP_API_URL}/api/internships/${pendingDeleteId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete application");
        const updated = application.filter(app => app._id !== pendingDeleteId);
        setApplication(updated);
        setShowAlert(true);
      })
      .catch(err => console.error("Error during deletion:", err))
      .finally(() => {
        setShowConfirm(false);
        setPendingDeleteId(null);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };
  

  return (
   

      <Container className="my-5" style={{ maxWidth: '1000px' }}>
        <h2 className="page-title" style={{ fontFamily: 'Roboto' }}>
          Internship Opportunities Posted
        </h2>

        <Form className="mb-3 d-flex justify-content-center">
          <Form.Control
            type="text"
            placeholder="Search for an application"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "300px", margin: "20px 20px" }}
          />
        </Form>

        <SubmissionAlert
          show={showAlert}
          message="Application deleted successfully"
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
          <p className="text-center">No matching applications found.</p>
        ) : (
          filtered.map(app => (
            <ApplicationCardAdmin
              key={app._id}
              app={app}
              onDelete={handleDelete}
            />
          ))
        )
      )}
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
