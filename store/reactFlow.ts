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
  ReactFlowInstance,
} from "reactflow";

export const initialNodes = [
  {
    id: "idone",
    position: { x: 0, y: 0 },
    data: { label: "Try clicking on this node" },
    type: "flowNode",
  },
  {
    id: "idtwo",
    position: { x: -100, y: 100 },
    data: { label: "Click on any edge to animate it." },
    type: "flowNode",
  },
  {
    id: "idthree",
    position: { x: 100, y: 100 },
    data: { label: "Double click on any edge to remove it." },
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
  {
    id: "e1-3",
    source: "idone",
    target: "idthree",
    sourceHandle: "bottom",
  },
];

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (newNode: Node) => void;
  setEdges: (edges: Edge[]) => void;
  setNodes: (nodes: Node[]) => void;
  flowInstance: ReactFlowInstance | null;
  setFlowInstance: (instance: ReactFlowInstance) => void;
};

export const useReactFlowStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  addNode: (newNode: Node) =>
    set((state) => ({ nodes: [...state.nodes, newNode] })),

  setEdges: (edges: Edge[]) => set((state) => ({ edges: edges })),
  setNodes: (nodes: Node[]) => set((state) => ({ nodes: nodes })),
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
  flowInstance: null,
  setFlowInstance: (instance: ReactFlowInstance) => {
    set({ flowInstance: instance });
  },
}));
