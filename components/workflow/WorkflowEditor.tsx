import {
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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
import useWorkflow from "./store/workflow";

export default function WorkflowEditor() {
  const { nodes, connections, selectedNode } = useWorkflow((state) => ({
    nodes: state.nodes,
    connections: state.conections,
    selectedNode: state.selectedNode,
  }));
  const panelRef = useRef<null>(null);

  const nodeTypes = useMemo(
    () => ({
      trigger: NodeElement,
      action: NodeElement,
    }),
    []
  );

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
      {selectedNode && (
        <ResizablePanel minSize={25} maxSize={30} defaultSize={25}>
          <NodeSettings />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  );
}
