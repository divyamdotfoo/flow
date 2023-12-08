"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Node, Edge } from "reactflow";
import Dagre from "@dagrejs/dagre";
import React, { useCallback } from "react";
import { useReactFlowStore } from "@/store/reactFlow";

export default function SeePreview() {
  const router = useRouter();
  const { edges, nodes, setNodes, setEdges, flowInstance } =
    useReactFlowStore();
  const handler = () => console.log(nodes, edges);

  return <Button onClick={handler}>See preview</Button>;
}
