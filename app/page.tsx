"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  ControlButton,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  type OnConnect
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes, type ModuleNode } from "../flow/nodes";
import { initialEdges } from "../flow/edges";
import SiderItem from "@/components/siderItem";
import Popup from "@/components/popup";
import { TaskManager, type Task } from "@/task/taskManager";

interface Module {
  mid: number;
  name: string;
  input: {
    type: string;
    name: string;
    required: boolean;
    default: any;
  };
  output: {
    type: string;
    name: string;
    default: any;
  };
}

function Home() {
  const [modules, setModules] = useState<Module[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const [nextId, setNextId] = useState(0);
  const [result, setResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`${process.env.API_URL}/modules`)
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => {
        console.error("Error fetching modules:", err);
        return [];
      });
  }, []);

  function getWorkflow() {
    if (nodes.length === 0) {
      return;
    }
    const rootNode = nodes[0];

    const previousNodes: ModuleNode[] = [];
    function getPrevious(node: ModuleNode) {
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

    const nextNodes: ModuleNode[] = [];
    function getNext(node: ModuleNode) {
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
    
    const taskList: Task[] = [];
    workflow.forEach((node) => {
      const task = {
        mid: node.data.mid,
        input: node.data.input
      };
      taskList.push(task);
    });
    const taskManager = new TaskManager(taskList);
    const result = taskManager.doTask();
    setResult(result);
    setShowPopup(true);
  }

  function addModuleNode(mid: number, name: string) {
    setNodes((nodes) => {
      const newNode = {
        id: nextId.toString(),
        type: "module",
        position: { x: 100, y: 100 },
        data: {
          mid: mid,
          label: name,
          input: null
        }
      } satisfies ModuleNode;
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
        <div>
          {
            modules.map((module: Module) => {
              return <SiderItem key={module.mid} name={module.name} mid={module.mid} onClick={addModuleNode} />
            })
          }
        </div>
      </div>
      <div className="w-full bg-gray-100">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={ {hideAttribution: true} }
          >
          <Background />
          <Controls showInteractive={false}>
            <ControlButton title="clear nodes" aria-label="clear" onClick={() => { setNodes([]); setEdges([]); setNextId(0); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <line x1="20" y1="4" x2="4" y2="20" />
                <line x1="4" y1="4" x2="20" y2="20" />
              </svg>
            </ControlButton>
          </Controls>
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
      <Popup result={result} visible={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default Home;