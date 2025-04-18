import Nav from 'react-bootstrap/Nav';
import React, { useState } from 'react';
import ManageApplications from './ManageApplications.js'
import TrackProfiles from './TrackProfiles.js';
import TrackComments from "./TrackComments.js";
import AdminNavbar from '../AdminNavbar.js'; 


function ModerateContentNav() {
    const [activeTab, setActiveTab] = useState('ManageApplications');

    const renderTabContent = () => {
      switch (activeTab) {
        case 'ManageApplications':
          return <ManageApplications />;
        case 'TrackComments':
          return <TrackComments />;
        case 'TrackProfiles':
          return <TrackProfiles />;
        default:
          return <ManageApplications />;
      }
    };
    const customTabStyle = {
      backgroundColor: '#fff',
      borderBottom: 'none',
      borderRadius: '10px 10px 0 0',
      color: '#000',
      fontWeight: '500',
      textAlign: 'center',
    };
    
    const activeTabStyle = {
      ...customTabStyle,
      backgroundColor: '#FFB608',
      color: '#fff',

    };
    
        
  return (
    <>
    
    <AdminNavbar />
    <Nav fill variant="tabs" defaultActiveKey="TrackApplications" onSelect={(selectedKey) => setActiveTab(selectedKey)} >
      <Nav.Item style={{}}>
        <Nav.Link style={activeTab === 'ManageApplications' ? activeTabStyle : customTabStyle} eventKey="ManageApplications">Manage Job Applications</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={activeTab === 'TrackComments' ? activeTabStyle : customTabStyle} eventKey="TrackComments">Manage Comments</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={activeTab === 'TrackProfiles' ? activeTabStyle : customTabStyle} eventKey="TrackProfiles">Manage Companies Profiles</Nav.Link>
      </Nav.Item>
    </Nav>
    <div className="mt-4">
        {renderTabContent()}
      </div>
    </>
  );
}

export default ModerateContentNav;