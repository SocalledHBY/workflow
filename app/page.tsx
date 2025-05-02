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
  type OnConnect
} from "@xyflow/react";
import { SiderItems } from "@/components/siderItems";

import '@xyflow/react/dist/style.css';

import { AppNode, initialNodes, nodeTypes } from "../nodes";
import { initialEdges, edgeTypes } from "../edges";

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

    const previousNodes: AppNode[] = [];
    function getPrevious(node: AppNode) {
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

    const nextNodes: AppNode[] = [];
    function getNext(node: AppNode) {
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
    <div className="flex">
      <div className="w-72 h-screen bg-gray-600 select-none">
        <div className="w-full py-5 text-center text-xl font-semibold tracking-widest text-white bg-gray-800">
          WORKFLOW
        </div>
        <SiderItems addModuleBlock={addModuleBlock} />
        <div className="mx-12 border-2 bg-gray-200 rounded-xl text-center cursor-pointer" onClick={getWorkflow}>获取Workflow</div>
      </div>
      <div className="w-full h-screen bg-gray-100">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={ {hideAttribution: true} }
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Home;