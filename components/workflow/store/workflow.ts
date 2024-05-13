import { Edge, Node } from "reactflow";
import { create } from "zustand";
import { v4 as uuid } from "uuid";

type Workflow = {
  nodes: Node[];
  conections: Edge[];
  addNode: (prevNodeId: string) => void;
};

const useWorkflow = create<Workflow>((set, get) => ({
  nodes: [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        label: "Catch All Webhook",
        description: "Catch all POST,GET,PUT,DELETE Hooks",
      },
      type: "trigger",
    },
    //   { id: "2", position: { x: 0, y: 150 }, data: { label: "Send an Email /in Gmail", description: "Send an email using Gmail" }, type: "action" },
  ],
  conections: [{ id: "con-1", source: "1", target: "2" }],
  addNode(prevNodeId) {
    const prevNode = get().nodes.find((node) => node.id === prevNodeId)!;
    const nodeLength = get().nodes.length;
    const prevCon = get().conections.find((con) => con.source === prevNodeId);

    const newNode: Node = {
      id: `node-${uuid()}`,
      position: {
        x: prevNode.position.x,
        y: prevNode.position.y + (nodeLength > 1 ? 180 : 150),
      },
      data: {
        label: `Action ${uuid()}`,
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
      const newNodes = [...get().nodes, newNode].map((n) =>
        prevNode.position.y < n.position.y
          ? { ...n, position: { x: 0, y: n.position.y + 150 } }
          : n
      );
      const newConnections = [...get().conections, newEdge].map((con) =>
        con.id === prevCon.id ? { ...con, source: newNode.id } : con
      );

      set({ conections: newConnections });
      set({ nodes: newNodes });
      return;
    }

    set((state) => ({ nodes: [...state.nodes, newNode] }));
    set((state) => ({ conections: [...state.conections, newEdge] }));
  },
}));

export default useWorkflow;
