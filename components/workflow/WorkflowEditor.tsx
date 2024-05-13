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
import useWorkflow from "./store/workflow";


export default function WorkflowEditor() {
  const { nodes, connections } = useWorkflow(state => ({ nodes: state.nodes, connections: state.conections }));
  const panelRef = useRef<null>(null)

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
          edges={connections}
          
          // onConnect={onConnect}
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
