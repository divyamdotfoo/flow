import { Copy, Check } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { Button } from "./ui/button";

export function CodeBox({
  code,
  actualCode,
}: {
  code: string;
  actualCode: string;
}) {
  return (
    <ScrollArea className=" w-full h-full min-h-fit bg-card text-card-foreground rounded-sm p-3 relative">
      <CopyBtn code={actualCode} />
      <pre>
        <code dangerouslySetInnerHTML={{ __html: code }} className=" text-sm" />
      </pre>
    </ScrollArea>
  );
}

function CopyBtn({ code }: { code: string }) {
  const [clicked, setClicked] = useState(false);
  if (!clicked) {
    return (
      <Button
        variant={"ghost"}
        size={"icon"}
        className=" absolute top-1 right-1"
        onClick={() => {
          setClicked(true);
          window.navigator.clipboard.writeText(code);
          setTimeout(() => {
            setClicked(false);
          }, 2000);
        }}
      >
        <Copy size={12} />
      </Button>
    );
  } else {
    return (
      <Button
        variant={"ghost"}
        size={"icon"}
        className=" absolute top-1 right-1"
      >
        <Check size={12} />
      </Button>
    );
  }
}
