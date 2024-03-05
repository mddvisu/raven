import React from 'react';
import './SidebarTab.css';

const SidebarTab = ({ sidetabs }) => {
    return (
        <div className="sidebar-tab">
            <h1 className="title">Class Names:</h1>
            <ul className=''>
                {sidetabs.map((classData, index) => (
                    <li key={index}>{classData.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarTab;
