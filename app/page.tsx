"use client";
import { useState, useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  type OnConnect,
  BuiltInNode
} from "@xyflow/react";
import { SiderItems } from "@/components/siderItems";

import '@xyflow/react/dist/style.css';

import { initialNodes } from "../nodes";
import { initialEdges } from "../edges";

function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nextId, setNextId] = useState(0);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  function getWorkflow() {
    if (nodes.length === 0) {
      return;
    }
    const rootNode = nodes[0];

    const previousNodes: BuiltInNode[] = [];
    function getPrevious(node: BuiltInNode) {
      previousNodes.push(node);
      const incomers = getIncomers({ id: node.id }, nodes, edges);
      if (incomers.length === 0) {
        return;
      }
      getPrevious(incomers[0]);
    }
    const rootIncomers = getIncomers({ id: rootNode.id }, nodes, edges);
    if (rootIncomers.length > 0) {
      getPrevious(rootIncomers[0]);
    }

    const nextNodes: BuiltInNode[] = [];
    function getNext(node: BuiltInNode) {
      nextNodes.push(node);
      const outgoers = getOutgoers({ id: node.id }, nodes, edges);
      if (outgoers.length === 0) {
        return;
      }
      getNext(outgoers[0]);
    }
    const rootOutgoers = getOutgoers({ id: rootNode.id }, nodes, edges);
    if (rootOutgoers.length > 0) {
      getNext(rootOutgoers[0]);
    }
    
    const workflow = [...previousNodes.reverse(), rootNode, ...nextNodes];
    console.log(workflow.map(node => node.data.label).join(" -> "));
  }

  function addModuleBlock(moduleName: string) {
    setNodes((nodes) => {
      const newNode = {
        id: nextId.toString(),
        position: { x: 0, y: 0 },
        data: { label: moduleName }
      };
      setNextId((id) => id + 1);
      return nodes.concat(newNode);
    });
  }

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-gray-600 select-none">
        <div className="w-full py-5 text-center text-xl font-semibold tracking-widest text-white bg-gray-800">
          WORKFLOW
        </div>
        <SiderItems addModuleBlock={addModuleBlock} />
      </div>
      <div className="w-full bg-gray-100">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={ {hideAttribution: true} }
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="fixed bottom-8 right-8 w-14 h-14 rounded-[50%] shadow-lg/40 transition hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g className="cursor-pointer" onClick={getWorkflow}>
            <circle cx="12" cy="12" r="12" className="fill-gray-800" />
            <polygon points="10,8 16,12 10,16" className="fill-gray-200" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Home;