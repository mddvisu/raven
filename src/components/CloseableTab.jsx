import { useState, useEffect, useRef } from "react";
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
  MarkerType
} from 'reactflow';
import ClassNode from "./ClassNode";
import 'reactflow/dist/style.css';
import './ClassNode.css';
import dagre from 'dagre';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
    classNode: ClassNode,
};



const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 500;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
    });

    return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);




const ClosableTab = ({classData}) => {

    const prevItemIdRef = useRef();
    useEffect(() => {
        prevItemIdRef.current = classData;
    });
    const prevItemId = prevItemIdRef.current;

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    /*
    const onConnect = useCallback(
        (params) => {
            console.log(params);
            setEdges((eds) => addEdge(params, eds));
        },
        [setEdges],
    );*/


    const onLayout = useCallback(
        (direction) => {
          const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            direction
          );
    
          setNodes([...layoutedNodes]);
          setEdges([...layoutedEdges]);
        },
        [nodes, edges]
      );


    //const [classData, setClassData] = useState();

    const [layoutStuff, setLayoutStuff] = useState(false);
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
        onLayout('TB');
        setLayoutStuff(false);
    }, [layoutStuff]);

    const createClassTab = useCallback((data = undefined) => {
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
                <div style={{textAlign: "left"}}>
                    <h1>{data.name}</h1>
                    <h2>Access: {data.access}</h2>
                    <h2>Extends: {data.extends}</h2>
                    <h2>Static: {data.static.toString()}</h2>
                    <h2>Abstract: {data.abstract.toString()}</h2>
                    <h2>Interface: {data.interface.toString()}</h2>
                    <h2>Attributes: </h2>
                    <div style={{fontSize: "75%"}} >
                        {data.attributes.map((attribute) => (
                            <h3>
                                - {attribute.name}
                            </h3>
                        ))}
                    </div>
                    <h2>Methods: </h2>
                    <div style={{fontSize: "75%"}} >
                        {data.methods.map((method) => (
                            <h3>
                                - {method.name}
                            </h3>
                        ))}
                    </div>
                </div>
            }
        ]);
        setOpenTabsCount(openTabsCount + 1); // Increment count
        setSelectedTab(`${openTabsCount + 1}`); // Select the newly created tab
    }, [panels, tabs]);

    useEffect(() => {
        const onClick = (event) => {
            let classIndex = Number(event.target.value);
            let classObject = classData[classIndex];
            createClassTab(classObject);
        }
        if (classData !== prevItemId) {
            setNodes((nds) =>
                classData.map((cl, i) => {
                    let node = { id: (i + 1).toString(), type: 'classNode', position: { x: (i * 200), y: 0 }, data: { onClick: onClick, classData: cl, classIndex: i } }
                    return node;
                })
            );
            setEdges((edg) =>
            {
                let retval = [];
                for (let i = 0; i < classData.length; i++) {
                    for (let j = 0; j < classData.length; j++) {
                        if (classData[j].name === classData[i].extends) {
                            console.log("hi");
                            let edge = {
                                type: 'step',
                                source: (j + 1).toString(),
                                target: (i + 1).toString(),
                                id: i.toString(),
                                animated: true,
                                markerStart: {
                                    type: MarkerType.Arrow,
                                    width: 20,
                                    height: 20,
                                    color: '#FFFFFF',
                                },
                                    style: {
                                    strokeWidth: 2,
                                    stroke: '#FFFFFF',
                                },
                            };
                            retval.push(edge);
                        }
                    }
                }
                setLayoutStuff(true);
                return retval;
            });
        }
    },
    [classData, setNodes, createClassTab]);

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
                            proOptions={{ hideAttribution: true }}
                            nodeTypes={nodeTypes}
                        >
                            <Controls />
                            <Background variant="dots" gap={12} size={1} />
                        </ReactFlow>
                    </div>
                    <button style={{ marginTop: "50px", border: "4px solid white" }} onClick={() => onLayout('TB')}>LAYOUT</button>
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