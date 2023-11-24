"use client";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
];
export default function Flow() {
  return (
    <div className=" w-full h-full">
      <ReactFlow fitView nodes={initialNodes}>
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
