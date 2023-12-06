"use client";

import { useReactFlowStore } from "@/store/reactFlow";
import ReactFlow, { Background, Node } from "reactflow";

export default function Page() {
  const { edges, nodes } = useReactFlowStore();
  console.log(edges, nodes);
  const editNodes = (nodes: Node[]) => {
    return nodes.map(({ type, ...rest }) => rest);
  };
  return (
    <div className="  w-96 h-96 resize">
      <ReactFlow nodes={editNodes(nodes)} edges={edges} fitView>
        <Background size={1} gap={12} />
      </ReactFlow>
    </div>
  );
}
