import Nav from 'react-bootstrap/Nav';
import React, { useState } from 'react';
import TrackApplications from './TrackApplications.js'
import TrackProfiles from './TrackProfiles.js';
import TrackComments from "./TrackComments.js";


function ModerateContentNav() {
    const [activeTab, setActiveTab] = useState('TrackApplications');

    const renderTabContent = () => {
      switch (activeTab) {
        case 'TrackApplications':
          return <TrackApplications />;
        case 'TrackComments':
          return <TrackComments />;
        case 'TrackProfiles':
          return <TrackProfiles />;
        default:
          return null;
      }
    };
  

        
  return (
    <>
    <Nav fill variant="tabs" defaultActiveKey="TrackApplications" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
      <Nav.Item>
        <Nav.Link eventKey="TrackApplications">Manage Job Applications</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="TrackComments">Manage Comments</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="TrackProfiles">Manage Companies Profiles</Nav.Link>
      </Nav.Item>
    </Nav>
    <div className="mt-4">
        {renderTabContent()}
      </div>
    </>
  );
}

export default ModerateContentNav;