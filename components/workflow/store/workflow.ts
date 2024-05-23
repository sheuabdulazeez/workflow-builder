import { Edge, Node, NodeChange, NodeProps } from "reactflow";
import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Nodes } from "@/lib/workflow/nodes";
import {
  EventType,
  INodeDescription,
  Option,
} from "@/lib/workflow/nodes/interface";
import { Id } from "@/convex/_generated/dataModel";

interface IWorkflow {
  id?: Id<"workflows"> | null;
  title?: string;
  active?: boolean;
  nodes?: Node[];
  connections?: Edge[];
}

type Workflow = {
  id?: Id<"workflows"> | null;
  title: string;
  active: boolean;
  availableNodes: INodeDescription[];
  selectedNode: null | NodeProps;
  nodes: Node[];
  connections: Edge[];
  addNode: (prevNodeId: string) => void;
  getAppOptions: (type: EventType) => Option[];
  getAppEventOptions: (app: string) => Option[];
  setSelectedNode: (node: NodeProps | null) => void;
  updateNodeData: (data: NodeProps["data"]) => void;
  onNodesChange: (props: NodeChange[]) => void;
  updateWorkflow: (data: IWorkflow) => void;
  getNodeInfo: (name: string) => INodeDescription|undefined
};

const useWorkflow = create<Workflow>((set, get) => ({
  title: "",
  active: false,
  availableNodes: Nodes,
  selectedNode: null,
  nodes: [],
  connections: [],
  addNode(prevNodeId) {
    const prevNode = get().nodes.find((node) => node.id === prevNodeId)!;
    const nodeLength = get().nodes.length;
    const prevCon = get().connections.find((con) => con.source === prevNodeId);

    const newNode: Node = {
      id: `node-${uuid()}`,
      position: {
        x: prevNode.position.x,
        y: prevNode.position.y + prevNode.height!,
      },
      data: {
        label: `Action`,
        description: "Add an action to be performed",
      },
      type: "action",
    };

    const newEdge: Edge = {
      id: `con-${uuid()}`,
      source: prevNodeId,
      target: newNode.id,
    };

    if (prevCon) {
      const newNodes = get().nodes.map((n) =>
        prevNode.position.y < n.position.y
          ? { ...n, position: { x: 0, y: n.position.y + 180 } }
          : n
      );
      const newConnections = get().connections.map((con) =>
        con.id === prevCon.id ? { ...con, source: newNode.id } : con
      );

      set({ connections: [...newConnections, newEdge] });
      set({ nodes: [...newNodes, newNode] });
      return;
    }

    set((state) => ({ nodes: [...state.nodes, newNode] }));
    set((state) => ({ connections: [...state.connections, newEdge] }));
  },
  setSelectedNode(node) {
    set({ selectedNode: node });
  },
  getAppOptions(type) {
    return get()
      .availableNodes.filter(
        (node) => node.events?.filter((ev) => ev.type === type).length
      )
      .map((app) => ({ label: app.displayName, value: app.name }));
  },
  getAppEventOptions(app) {
    const eventType = get().selectedNode?.type;
    return (
      get()
        .availableNodes.find((node) => node.name === app)
        ?.events?.filter((e) => e.type === (eventType as any))
        .map((event) => ({ label: event.displayName, value: event.name })) ?? []
    );
  },
  updateNodeData(data) {
    set((state) => ({
      selectedNode: state.selectedNode
        ? {
            ...state.selectedNode,
            data: { ...state.selectedNode?.data, ...data },
          }
        : null,
    }));
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === state.selectedNode?.id
          ? { ...n, data: { ...n.data, ...data } }
          : n
      ),
    }));
  },
  onNodesChange(nodesChanges) {
    nodesChanges.forEach((nChanges) => {
      switch (nChanges.type) {
        case "dimensions":
          set((state) => ({
            nodes: state.nodes.map((n) =>
              n.id === nChanges.id ? { ...n, ...nChanges.dimensions } : n
            ),
          }));
          break;
        case "position":
          set((state) => ({
            nodes: state.nodes.map((n) =>
              n.id === nChanges.id
                ? {
                    ...n,
                    position: nChanges.position!,
                    positionAbsolute: nChanges.positionAbsolute,
                  }
                : n
            ),
          }));
          break;
        default:
          break;
      }
    });
  },
  updateWorkflow(workflowData) {
    console.log(workflowData.connections);
    set((state) => ({ ...state, ...workflowData }));
  },
  getNodeInfo(name){
    return get().availableNodes.find(n => n.name === name);
  }
}));

export default useWorkflow;
