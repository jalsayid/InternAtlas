import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackApplicationCard from '../components/TrackApplicationCard';
import ApplicationDetailModal from '../components/ApplicationDetailModal';
import { applications } from '../data/dummyData'; 

function TrackApplicationsRawan() {
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = applications.filter(app =>
    app.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Track Applications</h2>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for an application"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form>

      {filtered.map(app => (
        <TrackApplicationCard
          key={app.id}
          app={app}
          onClick={(data) => {
            setSelected(data);
            setShowDetail(true);
          }}
        />
      ))}

      <ApplicationDetailModal
        show={showDetail}
        handleClose={() => setShowDetail(false)}
        app={selected}
      />
    </Container>
  );
}

export default TrackApplicationsRawan;
