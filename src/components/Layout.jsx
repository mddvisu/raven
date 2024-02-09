import { useState } from 'react';
import { Tab } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';

const Layout = () => {
    const [selectedTab, setSelectedTab] = useState('1');

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <TabContext value={selectedTab}>
            <TabList className="border-2 border-#[2f222f] bg-white text-white rounded-2xl"onChange={handleChange} aria-label="lab API tabs example">
                <Tab className='text-white' label="Static" value="1" />
                <Tab className='text-white'  label="Dynamic" value="2" />
                <Tab className='text-white'  label="Closable" value="3" />
            </TabList>
            <TabPanel value="1" className='text-white'>Item One</TabPanel>
            <TabPanel value="2" className='text-white'>Item Two</TabPanel>
            <TabPanel value="3" className='text-white'>Item Three</TabPanel>
        </TabContext>
    );
};

export default Layout;
