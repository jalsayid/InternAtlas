import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackApplicationCard from './TrackApplicationCard.js';
import CompanyNavBar from '../CompanyNavBar'; 

function TrackApplications() {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const username = sessionStorage.getItem('loggedInUser'); // Get the username from sessionStorage
    if (username) {
      fetch(`http://localhost:3001/api/internships/company/${username}`)
        .then(res => res.json())
        .then(data => {
          setApplications(data); // Save fetched data into state
        })
        .catch(err => {
          console.error("Failed to fetch internship opportunities", err);
        })
        .finally(() => setLoading(false));;
    }
  }, []);

  const filtered = applications.filter(app =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CompanyNavBar /> {/*  Add NavBar at top */}

      <Container className="my-5" style={{ maxWidth: '1000px' }}>
        <h2 className="page-title" style={{ fontFamily: 'Roboto'}}>
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

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          filtered.length === 0 ? (
            <p className="text-center">No matching internships found.</p>
          ) : (
            filtered.map(app => (
              <TrackApplicationCard
                key={app._id}
                app={app}
              />
            ))
          )
        )}
      </Container>
    </>
  );
}

export default TrackApplications;
