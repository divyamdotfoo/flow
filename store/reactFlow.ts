import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

export const initialNodes = [
  {
    id: "idone",
    position: { x: 0, y: 0 },
    data: { label: "This is a FlowNode alright?" },
    type: "flowNode",
  },
  {
    id: "idtwo",
    position: { x: 0, y: 100 },
    data: { label: "This comes default with reactflow" },
    type: "flowNode",
  },
];
export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "idone",
    target: "idtwo",
    sourceHandle: "bottom",
  },
];

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (newNode: Node) => void;
  setEdges: (edges: Edge[]) => void;
};

export const useReactFlowStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  addNode: (newNode: Node) =>
    set((state) => ({ nodes: [...state.nodes, newNode] })),

  setEdges: (edges: Edge[]) => set((state) => ({ edges: edges })),
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));
