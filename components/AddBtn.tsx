"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useReactFlowStore } from "@/store/reactFlow";

const AddBtnComponent = motion(
  forwardRef((props, ref: any) => {
    const { addNode } = useReactFlowStore();
    const handler = () => {
      console.log("i called");
      addNode({
        id: crypto.randomUUID(),
        position: { x: 250, y: 0 },
        data: { label: "Try editing this node" },
        type: "flowNode",
      });
    };
    return (
      <Button
        className="rounded-full"
        size={"icon"}
        ref={ref}
        onClick={handler}
      >
        <Plus size={100} />
      </Button>
    );
  })
);

export default function AddBtn() {
  return (
    <AddBtnComponent
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 1 }}
      initial={{ scale: 1.1 }}
    />
  );
}
