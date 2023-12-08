"use client";
import FlowNode from "./FlowNode";
import { useCallback } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import { RFState, useReactFlowStore } from "@/store/reactFlow";
const nodeTypes = {
  flowNode: FlowNode,
};

const selector = (s: RFState) => {
  return {
    nodes: s.nodes,
    edges: s.edges,
    onEdgesChange: s.onEdgesChange,
    onNodesChange: s.onNodesChange,
    onConnect: s.onConnect,
    setEdges: s.setEdges,
    setFlowInstance: s.setFlowInstance,
  };
};
export default function Flow() {
  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    setEdges,
    setFlowInstance,
  } = useReactFlowStore(selector);

  const edgeClick = (eID: string) => {
    const otherEdges = edges.filter((z) => z.id !== eID);
    const toChange = edges.find((z) => z.id === eID)!;
    const toReturn = { ...toChange, animated: !toChange.animated };
    setEdges([...otherEdges, toReturn]);
  };
  const nodeClick = (nId: string) => {};

  return (
    <div className=" w-full h-full">
      <ReactFlow
        onInit={(instance) => setFlowInstance(instance)}
        fitView
        fitViewOptions={{ maxZoom: 1.2 }}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={(ev, edge) => {
          edgeClick(edge.id);
        }}
        onEdgeDoubleClick={(event, edge) => {
          setEdges(edges.filter((z) => z.id !== edge.id));
        }}
        onEdgeContextMenu={(ev, edge) => {
          console.log(edge);
        }}
        onNodeClick={(e, n) => console.log(n)}
      >
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
