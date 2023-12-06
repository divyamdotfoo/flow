"use client";
import FlowNode from "./FlowNode";
import { useCallback } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import { useReactFlowStore } from "@/store/reactFlow";
const nodeTypes = {
  flowNode: FlowNode,
};

export default function Flow() {
  console.log("again");
  const nodes = useReactFlowStore((s) => s.nodes);
  const edges = useReactFlowStore((s) => s.edges);
  const onEdgesChange = useReactFlowStore((s) => s.onEdgesChange);
  const onNodesChange = useReactFlowStore((s) => s.onNodesChange);
  const onConnect = useReactFlowStore((s) => s.onConnect);
  const setEdges = useReactFlowStore((s) => s.setEdges);

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
        fitView
        fitViewOptions={{ maxZoom: 1.3 }}
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
