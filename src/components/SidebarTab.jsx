import React from 'react';
import './SidebarTab.css';
import CloseableTab from './CloseableTab';

const SidebarTab = ({ sidetabs }) => {
    const handleButtonClick = (classData) => {
        console.log('Clicked class button:', classData);
        CloseableTab.focusOnClass(classData);
    };
    return (
        <div className="sidebar-tab">
            <h1 className="title">Class Names:</h1>
            <ul className=''>
                {sidetabs.map((classData, index) => (
                    <button key={index} className="class-button" onClick={() => handleButtonClick(classData)}>
                        {classData.name}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default SidebarTab;
