import { useState, useEffect } from "react";
import { Tab, Grid, Button } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

const ClosableTab = () => {
    const [selectedTab, setSelectedTab] = useState('1');
    const [tabs, setTabs] = useState([]);
    const [panels, setPanels] = useState([]);
    const [openTabsCount, setOpenTabsCount] = useState(1); // Initial count with main tab

    useEffect(() => {
        // Automatically select main tab if there's only one tab
        if (openTabsCount === 1) {
            setSelectedTab('1');
        }
    }, [openTabsCount]);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const createBlueBox = () => {
        const newTab = {
            value: `${openTabsCount + 1}`, // Incrementing count when new tab is created
            label: `Blue Box ${openTabsCount + 1}`
        };
        setTabs([...tabs, newTab]);
        setPanels([
            ...panels,
            {
                value: `${openTabsCount + 1}`,
                child: () => <div style={{ height: '300px', width: '300px', backgroundColor: 'blue' }} />
            }
        ]);
        setOpenTabsCount(openTabsCount + 1); // Increment count
        setSelectedTab(`${openTabsCount + 1}`); // Select the newly created tab
    };

    const createRedBox = () => {
        const newTab = {
            value: `${openTabsCount + 1}`, // Incrementing count when new tab is created
            label: `Red Box ${openTabsCount + 1}`
        };
        setTabs([...tabs, newTab]);
        setPanels([
            ...panels,
            {
                value: `${openTabsCount + 1}`,
                child: () => <div style={{ height: '400px', width: '400px', backgroundColor: 'red' }} />
            }
        ]);
        setOpenTabsCount(openTabsCount + 1); // Increment count
        setSelectedTab(`${openTabsCount + 1}`); // Select the newly created tab
    };

    const handleClose = (value) => {
        const tabArr = tabs.filter(t => t.value !== value);
        setTabs(tabArr);

        const panelArr = panels.filter(p => p.value !== value);
        setPanels(panelArr);

        setOpenTabsCount(openTabsCount - 1); // Decrement count

        setSelectedTab(`1`);
    }

    return (
        <div className="">
            <TabContext value={selectedTab} className= "bg-gray-400"  >
                <div className=" bg-gray-800 rounded-2xl w-[660px]">
                    <TabList onChange={handleChange} aria-label=" lab API tabs example" className="flex rounded-lg w-full h-[65px] mb-4 ">
                        <Tab
                            label="Main Tab"
                            value="1"
                            className={` hover:bg-gray-900 pt-4 text-white rounded-full hover:rounded-2xl ${selectedTab === "1" ? 'bg-gray-900' : 'bg-gray-800'}`}
                            style={{ width: `150px`, height: '72px', color: 'white', margin: '2px'}}
                        />

                        {tabs.map((tab) => (
                            <Tab
                                icon={<CloseIcon className="ml-2 hover:bg-red-800 rounded-full"onClick={() => handleClose(tab.value)} />}
                                iconPosition="end"
                                className={`hover:rounded-2xl hover:bg-gray-900 mb-4 rounded-2xl ${selectedTab === tab.value ? 'bg-gray-900' : 'bg-gray-700'}`}
                                style={{ color: 'white' }}
                                key={tab.value} label={tab.label} value={tab.value}
                            />
                        ))}
            </TabList>

                </div>
                <TabPanel value="1" sx={{ height: '200px', overflowY: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={18}>
                            <Button onClick={createRedBox} variant="contained" color="primary">
                                Create Red Box
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={18}>
                            <Button onClick={createBlueBox} variant="contained" color="secondary">
                                Create Blue Box
                            </Button>
                        </Grid>
                    </Grid>
                </TabPanel>
                {panels.map((panel) => (
                    <TabPanel key={panel.value} value={panel.value}>
                        {panel.child()}
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    );
};

export default ClosableTab;
