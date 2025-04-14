import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import ApplicationCardAdmin from './ApplicationCardAdmin.js';
import { applications } from '../dummyData'; 

function ManageApplications() {
  const [search, setSearch] = useState("");
  const [application, setApplication] = useState(applications);

  const filtered = application.filter(app =>
    app.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmAction = window.confirm("Are you sure you want to delete this item?");
    if (confirmAction) {
      const updated = application.filter(application => application.id !== id);
      setApplication(updated);
      alert("Item deleted!");
    } else {
      alert("Deletion canceled.");
    }

      
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

      {filtered.map(app => (
        <ApplicationCardAdmin
          key={app.id}
          app={app}
          onDelete={handleDelete}
        />
      ))}

    </Container>
  );
}

export default ManageApplications;