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
 
const initialNodes = [];
const initialEdges = [];

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

    const createClassTab = (data = undefined) => {
        const newTab = {
            value: `${openTabsCount + 1}`, // Incrementing count when new tab is created
            label: `${data.name}`
        };
        setTabs([...tabs, newTab]);
        setPanels([
            ...panels,
            {
                value: `${openTabsCount + 1}`,
                child: () => 
                <div className="w-[500px] bg-gray-400">
                    <div style={{textAlign: "left"}}>
                        <h1>{data.name}</h1>
                        <h2>Access: {data.access}</h2>
                        <h2>Extends: {data.extends}</h2>
                        <h2>Static: {data.static.toString()}</h2>
                        <h2>Abstract: {data.abstract.toString()}</h2>
                        <h2>Interface: {data.interface.toString()}</h2>
                        <h2>Attributes: </h2>
                        <div style={{fontSize: "75%"}} className="w-full" >
                            <div className="w-[1/2]">
                                {data.attributes.slice(0, Math.ceil(data.attributes.length / 2)).map((attribute, index) => (
                                    <h3 key={index}>- {attribute.name}</h3>
                                ))}
                            </div>
                            <div className="w-[2/2]">
                                {data.attributes.slice(Math.ceil(data.attributes.length / 2)).map((attribute, index) => (
                                    <h3 key={index}>- {attribute.name}</h3>))}
                            </div>

                            {/* {data.attributes.map((attribute) => (
                                <h3>
                                    - {attribute.name}
                                </h3>
                            ))} */}
                        </div>
                        <h2>Methods: </h2>
                        <div style={{fontSize: "55%"}} >
                            {data.methods.map((method) => (
                                <h3>
                                    - {method.name}
                                </h3>
                            ))}
                        </div>
                    </div>
                </div>
            }
        ]);
        setOpenTabsCount(openTabsCount + 1); // Increment count
        setSelectedTab(`${openTabsCount + 1}`); // Select the newly created tab
    };

    useEffect(() => {
        const onClick = (event) => {
            let classIndex = Number(event.target.value);
            let classObject = classData[classIndex];
            createClassTab(classObject);
        }
        setNodes((nds) =>
        classData.map((cl, i) => {
                let node = { id: cl.name, type: 'classNode', position: { x: (i * 200), y: 0 }, data: { onClick: onClick, classData: cl, classIndex: i } }
                return node;
            })
        );
    }, [classData, setNodes, createClassTab]);

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
                <TabList onChange={handleChange} aria-label="lab API tabs example" className=" flex rounded-lg bg-gray-800 color-white w-[660px] h-[65px] mb-4">
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
                    {/* <div style={{ width: "610px", height: "440px", background: 'black' }}> */}
                    <div className="w-[610px] h-[440px] bg-gray-800 text-white rounded-2xl">
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
                            {/* <Background variant="cross" gap={12} size={1} /> */}
                        </ReactFlow>
                    </div>
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