"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RFState, useReactFlowStore } from "@/store/reactFlow";
import Dagre from "@dagrejs/dagre";
import { Node, Edge, useReactFlow } from "reactflow";
import { nanoid } from "nanoid/non-secure";
export default function Sidebar() {
  return (
    <motion.div className="relative basis-1/4 bg-card text-card-foreground flex flex-col">
      <Info />
      <TextToFlow />
    </motion.div>
  );
}

function Info() {
  return (
    <div className=" py-2 px-2">
      <p className=" font-semibold pb-3 opacity-90">
        Generate flowcharts from text
      </p>
      <p className=" text-base foreground opacity-80 pb-2">
        Write a single topic on each line. Starting characters of the line
        decide the nature of each node. Here is the list of supported
        characters:
      </p>

      <div>
        <p className=" flex flex-col items-start">
          <span className=" text-lg font-bold opacity-70 text-primary">
            # Parent
          </span>
          <span className=" text-sm opacity-90">
            This will create a parent Node
          </span>
        </p>
        <p className=" flex flex-col items-start">
          <span className=" text-lg font-bold opacity-70 text-primary">
            - Child
          </span>
          <span className=" text-sm opacity-90">
            This will create a Child Node connected to the above parent
          </span>
        </p>
      </div>
    </div>
  );
}

const selector = (state: RFState) => ({
  setEdges: state.setEdges,
  setNodes: state.setNodes,
  nodes: state.nodes,
  edges: state.edges,
  flowInstance: state.flowInstance,
});

function TextToFlow() {
  const [markdown, setMarkdown] = useState(
    "# A parent node \n- child node1\n- child node2\n# Other parent nodes"
  );
  const { setNodes, setEdges, flowInstance } = useReactFlowStore(selector);
  const handler = () => {
    const data = mkdwnToNodeEdge(markdown);
    if (!data) return false;
    const { nodes, edges } = DagreLayouting(data.nodes, data.edges);
    setNodes(nodes);
    setEdges(edges);
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        flowInstance?.fitView({ maxZoom: 1.2 });
      });
    }, 0);
  };
  return (
    <div className=" pl-2 pr-6 flex flex-col justify-between h-full pb-4">
      <textarea
        spellCheck={false}
        className=" placeholder:text-sm w-full bg-accent text-accent-foreground rounded-md border-none outline-none p-2 basis-4/5 opacity-80 resize-none"
        name="textarea"
        placeholder={`# A parent node \n- child node1\n- child node2\n# Other parent nodes
        `}
        value={markdown}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
          }
        }}
        onChange={(e) => {
          setMarkdown(e.target.value);
        }}
      ></textarea>
      <Button onClick={handler}>Generate flow</Button>
    </div>
  );
}

function mkdwnToNodeEdge(mkdwn: string) {
  const data = mkdwn.split("\n").map((z) => z.trim());
  const checkMkdwn = (data: string[]) =>
    data.every((z) => z.startsWith("#") || z.startsWith("-"));
  if (!checkMkdwn(data)) return false;
  const generateFamily = () => {
    const family: {
      id: string;
      data: string;
      children: { data: string; id: string }[];
    }[] = [];
    let parent = -1;
    for (const node of data) {
      if (node.startsWith("#")) {
        family.push({
          data: node.slice(1).trim(),
          children: [],
          id: nanoid(5),
        });
        parent++;
      } else {
        family[parent].children.push({
          data: node.slice(1).trim(),
          id: nanoid(5),
        });
      }
    }
    return family;
  };
  const family = generateFamily();
  const genrerateNodesEdges = () => {
    const edges: Edge[] = [];
    const nodes: Node[] = [];
    for (let i = 0; i < family.length; i++) {
      nodes.push({
        id: family[i].id,
        data: { label: family[i].data },
        position: { x: 0, y: 0 },
        type: "flowNode",
      });
      if (family[i].children.length) {
        for (const node of family[i].children) {
          nodes.push({
            id: node.id,
            data: { label: node.data },
            position: {
              x: 0,
              y: 0,
            },
            type: "flowNode",
          });
          edges.push({
            id: nanoid(5),
            source: family[i].id,
            target: node.id,
            sourceHandle: "bottom",
            targetHandle: "top",
          });
        }
      }
      if (i !== family.length - 1) {
        edges.push({
          id: nanoid(5),
          source: family[i].id,
          target: family[i + 1].id,
          sourceHandle: "bottom",
          targetHandle: "top",
        });
      }
    }
    return { nodes, edges };
  };

  const { nodes, edges } = genrerateNodesEdges();
  return { nodes, edges };
}

function DagreLayouting(nodes: Node[], edges: Edge[]) {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, { label: node.data.label, width: 140, height: 40 })
  );

  Dagre.layout(g);

  return {
    edges,
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
  };
}
