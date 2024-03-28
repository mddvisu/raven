import React from 'react';
import './SidebarTab.css';


const SidebarTab = ({ sidetabs, handleFocusClass }) => {
    return (
        <div className="sidebar-tab">
            <h1 className="title">Class Names:</h1>
            <ul className=''>
                {sidetabs?.map((classData, index) => (
                    <button key={index} className="class-button" onClick={() => handleFocusClass.current.focusOnNode(index)}>
                        {classData.name}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default SidebarTab;