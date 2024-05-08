import { ReactNode, RefObject, useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import NodeSettings from "./NodeSettings";
import NodeElement from "./NodeElement";
import useNodeSettings from "./store/node-settings";

const initialNodes:  Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Catch All Webhook", description: "Catch all POST,GET,PUT,DELETE Hooks" }, type: "trigger" },
  { id: "2", position: { x: 0, y: 200 }, data: { label: "Send an Email in Gmail", description: "Send an email using Gmail" }, type: "action" },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const panelRef = useRef<null>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({
    trigger: NodeElement,
    action: NodeElement,
  }), []);

  const showNodeSettings = useNodeSettings(state => state.show);

  return (
    <ResizablePanelGroup direction="horizontal" className="bg-white">
      <ResizablePanel ref={panelRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          deleteKeyCode={[]}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={25} maxSize={30} defaultSize={25} className={`${!showNodeSettings ? "hidden": ""}`}>
        <NodeSettings />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
