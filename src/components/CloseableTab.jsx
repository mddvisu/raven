import { useState, useEffect, useRef } from "react";
import { Tab } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback } from 'react';
import ClassNode from "./ClassNode";
import 'reactflow/dist/style.css';
import './ClassNode.css';
import dagre from 'dagre';
import ClassInspector from './ClassInspector';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, MarkerType } from 'reactflow';

// Node types
const nodeTypes = {
    classNode: ClassNode
};

// Specifically for the auto layout feature
const nodeWidth = 172;
const nodeHeight = 500;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

/**
 * Takes in nodes and edges and lays them out based on their connections
 * https://reactflow.dev/examples/layout/dagre
 */
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
    node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
    });

    return { nodes, edges };
};

const ClosableTab = ({classData}) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [layoutStuff, setLayoutStuff] = useState(false);
    const [selectedTab, setSelectedTab] = useState('1');
    const [tabs, setTabs] = useState([]);
    const [panels, setPanels] = useState([]);
    const [openTabsCount, setOpenTabsCount] = useState(1); // Initial count with main tab

    const prevClassDataIdRef = useRef();
    useEffect(() => {
        prevClassDataIdRef.current = classData;
    });
    const prevClassDataId = prevClassDataIdRef.current;

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

    // Handle changing a tab
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Handle closing a tab
    const handleClose = (value) => {
        const tabArr = tabs.filter(t => t.value !== value);
        setTabs(tabArr);
        const panelArr = panels.filter(p => p.value !== value);
        setPanels(panelArr);
        setOpenTabsCount(openTabsCount - 1); // Decrement count
        setSelectedTab('1');
    }

    // Creates a new class inspector tab
    const createClassInspectorTab = useCallback((data = undefined) => {
        const newTab = {
            value: `${openTabsCount + 1}`, // Incrementing count when new tab is created
            label: `${data.name}`
        };
        setTabs([...tabs, newTab]);
        setPanels([
            ...panels,
            {
                value: `${openTabsCount + 1}`,
                child: () => <ClassInspector data = { data } />
            }
        ]);
        setOpenTabsCount(openTabsCount + 1); // Increment count
        setSelectedTab(`${openTabsCount + 1}`); // Select the newly created tab
    }, [panels, tabs]);
    
    // Automatically select main tab if there's only one tab
    useEffect(() => {
        if (openTabsCount === 1) {
            setSelectedTab('1');
        }
    }, [openTabsCount]);

    // Layout the nodes when layoutStuff is triggered
    useEffect(() => {
        onLayout('TB');
        setLayoutStuff(false);
    }, [layoutStuff]);

    // Create nodes and connections from the class data whenever it is changed
    useEffect(() => {
        const onClick = (event) => {
            let classIndex = Number(event.target.value);
            let classObject = classData[classIndex];
            createClassInspectorTab(classObject);
        }
        if (classData !== prevClassDataId) {
            setNodes((nds) =>
                classData.map((cl, i) => {
                    let node = { 
                        id: (i + 1).toString(), 
                        type: 'classNode', 
                        position: { 
                            x: (i * 200), 
                            y: 0 
                        }, 
                        data: { 
                            onClick: onClick, 
                            classData: cl, 
                            classIndex: i 
                        } 
                    }
                    return node;
                })
            );
            setEdges((edg) =>
            {
                let retval = [];
                for (let i = 0; i < classData.length; i++) {
                    for (let j = 0; j < classData.length; j++) {
                        if (classData[j].name === classData[i].extends) {
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
        } else {
            nodes.forEach((nde) => {
                nde.data.onClick = onClick;
            })
        }
    },
    [classData, setNodes, createClassInspectorTab]);

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
                    <button style={{ marginTop: "50px", border: "4px solid white" }} onClick={() => onLayout('LR')}>LAYOUT</button>
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