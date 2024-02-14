import { useState, useEffect } from "react";
import { Tab, Grid, Button } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import ClassNode from "./ClassNode";
import 'reactflow/dist/style.css';
import './ClassNode.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
    classNode: ClassNode,
};

const ClosableTab = ({classData}) => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    //const [classData, setClassData] = useState();

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

    useEffect(() => {
        const onClick = (event) => {
            createClassTab(event.target.value);
            console.log(event.target);
        }
        setNodes((nds) =>
        classData.map((cl, i) => {
                let node = { id: cl.name, type: 'classNode', position: { x: (i * 200), y: 0 }, data: { onClick: onClick, classData: cl } }
                return node;
            })
        );
    }, [classData, setNodes]);

    const createClassTab = (data) => {
        console.log(openTabsCount);
        const newTab = {
            value: `${openTabsCount + 1}`, // Incrementing count when new tab is created
            label: `${data}`
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
                child: () => <div style={{ height: '200px', width: '200px', backgroundColor: 'red' }} />
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

        setSelectedTab('1');
    }

    return (
        <div className="">
            <TabContext value={selectedTab}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" className=" flex rounded-lg bg-gray-800 color-white w-full h-[65px] mb-4">
                    <Tab label="Main Tab" value="1" className=" pt-4 bg-black text-white rounded-l-lg mx-1" style={{ width: `150px`, height: '72px', color: 'white'}} />

                    {tabs.map((tab) => (
                        <Tab
                            icon={<CloseIcon onClick={() => handleClose(tab.value)} />}
                            iconPosition="end"
                            className="bg-white hover:bg-gray-900 mb-4"
                            style={{ color: 'white' }}
                            key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                </TabList>
                <TabPanel value="1" >
                    <div style={{ width: "610px", height: "440px" }}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            proOptions={{ hideAttribution: true }}
                            nodeTypes={nodeTypes}
                        >
                            <Controls />
                            <Background variant="dots" gap={12} size={1} />
                        </ReactFlow>
                    </div>
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

/*
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
*/