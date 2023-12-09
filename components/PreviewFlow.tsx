"use client";
import { useReactFlowStore } from "@/store/reactFlow";
import ReactFlow, { Background, Edge, Node } from "reactflow";
import { Button } from "./ui/button";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { CodeBox } from "./CodeBox";
import { ScrollArea } from "./ui/scroll-area";

export default function PreviewFlow() {
  const edges = useReactFlowStore((s) => s.edges);
  const nodes = useReactFlowStore((s) => s.nodes);
  return (
    <div className=" w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ maxZoom: 1.1 }}
      >
        <Background size={1} gap={12} />
      </ReactFlow>
    </div>
  );
}

const getCodeStr = (nodes: Node[], edges: Edge[]) => {
  const nodesStr = JSON.stringify(nodes, null, 2);
  const edgesStr = JSON.stringify(edges, null, 2);
  return `"use client";
  // Add this directive in nextjs 13.4 or above
  import ReactFlow,{Background} from "reactflow";
  const nodes=${nodesStr};
  const edges=${edgesStr};
  export default function MyFlow(){
  return(
      <div style={{width:"500px",height:"400px"}}>
      // width and height are customizable.
      <ReactFlow
      nodes={nodes}
      edges={edges}
       fitView
       fitViewOptions={{ maxZoom: 1.1 }}
      >       
      <Background size={1} gap={12} />
      </ReactFlow>
      </div>
  )  }
    `;
};

export function CopyCodeBtn() {
  const edges = useReactFlowStore((s) => s.edges);
  const nodes = useReactFlowStore((s) => s.nodes);
  const codeStr = getCodeStr(nodes, edges);
  const formattedCode = Prism.highlight(codeStr, Prism.languages.jsx, "jsx");
  console.log(formattedCode);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute top-2 right-4">Copy code</Button>
      </DialogTrigger>
      <DialogContent className=" sm:w-[500px] h-[400px]">
        <DialogHeader>
          <DialogTitle>Flow</DialogTitle>
          <DialogDescription>
            You need to install react and reactflow to add this flowchart.
          </DialogDescription>
        </DialogHeader>
        <p className=" text-sm font-semibold opacity-75">
          Add reactflow to your project
        </p>
        <CodeBox
          code={Prism.highlight(
            "npm install reactflow --save",
            Prism.languages.javascript,
            "javascript"
          )}
          actualCode="npm install reactflow --save"
        />
        <CodeBox code={formattedCode} actualCode={codeStr} />
      </DialogContent>
    </Dialog>
  );
}

export function GoBack() {
  const router = useRouter();
  return (
    <Button className=" absolute top-2 left-4" onClick={() => router.back()}>
      Edit mode
    </Button>
  );
}
