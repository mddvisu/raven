/*
import React from 'react';
import './SidebarTab.css';
import CloseableTab from './CloseableTab';


const SidebarTab = ({ sidetabs }) => {
    const handleButtonClick = (classData, index) => {
        console.log('Clicked class button:', classData);
        console.log('Clicked class button:', classData.name);
        console.log('classindex: ' + index);
        handleFocusOnNode(index);
    };
    return (
        <div className="sidebar-tab">
            <h1 className="title">Class Names:</h1>
            <ul className=''>
                {sidetabs.map((classData, index) => (
                    <button key={index} className="class-button" onClick={() => handleFocusClass(classData, index)}>
                        {classData.name}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default SidebarTab;
*/
/*
import React, { forwardRef, useImperativeHandle } from 'react';
import './SidebarTab.css';
import CloseableTab from './CloseableTab';


const SidebarTab = forwardRef(({ sidetabs }, ref) => {

    const handleFocusClass = (nodeId) => {
        handleFocusOnNode();
    }
    useImperativeHandle(ref, () => ({
        // Expose parent function to parent component
        callParentFunction: handleFocusClass,
    }));

    //console.log("class data" + classData);
    //console.log("class data" + classData[0].name);
    return (
        <div className="sidebar-tab">
            <h1 className="title">Class Names:</h1>
            <ul className=''>

                {classData?.map((classData, index) => (
                    <button key={index} className="class-button" onClick={() => handleFocusClass(index)}>
                        {classData.name}
                    </button>
                ))}
            </ul>
        </div>
    );
});

export default SidebarTab;
*/

import React from 'react';
import './SidebarTab.css';
import CloseableTab from './CloseableTab';


const SidebarTab = ({ sidetabs, handleFocusClass }) => {
    const handleButtonClick = (classData, index) => {
        handleFocusOnNode(index);
    };
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