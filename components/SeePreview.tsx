"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { RFState, useReactFlowStore } from "@/store/reactFlow";

const selector = (s: RFState) => {
  return {
    edges: s.edges,
    nodes: s.nodes,
  };
};
export default function SeePreview() {
  const router = useRouter();
  const handler = async () => {
    router.push(`/preview`);
  };
  return <Button onClick={handler}>See preview</Button>;
}
