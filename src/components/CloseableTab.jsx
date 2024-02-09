import { useState } from "react";
import { Tab, Grid, Button } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';

const ClosableTab = () => {
    const [selectedTab, setSelectedTab] = useState('1');
    const [tabs, setTabs] = useState([]);
    const [panels, setPanels] = useState([]);
    const [tabIndex, setTabIndex] = useState(2);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleTabOptions= () =>{
        setSelectedTab(`${tabIndex}`);
        setTabIndex(tabIndex + 1);
    }

    const createBlueBox = () => {
        const newTab = {
            value: `${tabIndex}`,
            label: `Blue Box ${tabIndex}`
        };
        setTabs([...tabs, newTab]);
        setPanels([
            ...panels,
            {
                value: `${tabIndex}`,
                child: () => <div style={{height: '300px', width: '300px', backgroundColor: 'blue'}}/>
            }
        ]);
        handleTabOptions();
    };
    const createRedBox = () => {
        const newTab = {
            value: `${tabIndex}`,
            label: `Red Box ${tabIndex}`
        };
        setTabs([...tabs, newTab]);
        setPanels([
            ...panels,
            {
                value: `${tabIndex}`,
                child: () => <div style={{height: '300px', width: '300px', backgroundColor: 'red'}}/>
            }
        ]);
        handleTabOptions();
    };

    return (
        <TabContext value={selectedTab}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="New Closable Tab " value="1" />

                {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
            </TabList>
            <TabPanel value="1">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Button onClick={createRedBox} variant="contained" color="primary">
                            Create Red Blue
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button onClick={createBlueBox} variant="contained" color="secondary">
                            Create Blue Blue
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
    );
};

export default ClosableTab;
