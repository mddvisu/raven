import { useState } from 'react';
import { Tab } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import ClosableTab from './CloseableTab';

const Layout = () => {
    const [selectedTab, setSelectedTab] = useState('1');

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className='text-white bg-white'>
            <TabContext value={selectedTab}>
            <TabList className="border-2 border-#[2f222f] bg-gray-300 text-white rounded-2xl"onChange={handleChange} aria-label="lab API tabs example">
                <Tab className='text-white'  label="Closable" value="1" />
            </TabList>
            <TabPanel value="1" className='text-white'><ClosableTab/></TabPanel>
        </TabContext>
        </div>
    );
};

export default Layout;
