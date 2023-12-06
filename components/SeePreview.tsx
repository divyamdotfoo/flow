"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useReactFlowStore } from "@/store/reactFlow";
import jwt from "jsonwebtoken";

export default function SeePreview() {
  const router = useRouter();
  const { edges, nodes } = useReactFlowStore();
  const handler = () => {
    const data = {
      edges,
      nodes,
    };
    console.log(data);
    // router.push(`/preview?z=${""}`);
  };
  return <Button onClick={handler}>See preview</Button>;
}
