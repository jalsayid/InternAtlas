import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackApplicationCard from './TrackApplicationCard.js';
import { applicationsForCompany } from '../dummyData'; 

function TrackApplications() {
  const [search, setSearch] = useState("");

  const filtered = applicationsForCompany.filter(app =>
    app.position.toLowerCase().includes(search.toLowerCase())
  );

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
        <TrackApplicationCard
          key={app.id}
          app={app}
          // onClick={(data) => {
          //   setSelected(data);
          //   setShowDetail(true);
          // }}
        />
      ))}

    </Container>
  );
}

export default TrackApplications;
