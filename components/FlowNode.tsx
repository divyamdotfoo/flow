import { useState, useRef, useEffect } from "react";
import { Handle, HandleType, Node, Position, useReactFlow } from "reactflow";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { motion } from "framer-motion";
export default function FlowNode({ data, id }: { data: any; id: string }) {
  const flowStore = useReactFlow();

  const nodeEdit = (id: string, text: string) => {
    const otherNodes = flowStore.getNodes().filter((z) => z.id !== id);
    const editedNode = flowStore.getNode(id);
    if (editedNode?.data.label) {
      editedNode.data.label = text;
      flowStore.setNodes([...otherNodes, editedNode]);
    }
  };
  const defaultHandles = [
    { type: "target", pos: "top" },
    { type: "source", pos: "bottom", id: "a" },
  ];
  const inputRef = useRef<HTMLTextAreaElement | HTMLElement | null>();
  const [editMode, setEditMode] = useState(false);
  const [handles, setHandles] = useState(defaultHandles);
  const [text, setText] = useState<string>(data.label);
  const [styles, setStyles] = useState({
    color: "#222",
    bg: "#fff",
    // border: "solid 0.3px #1a192b",
    bR: "3px",
  });

  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        editMode &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [editMode]);

  useEffect(() => {
    if (inputRef.current) {
      const el = inputRef.current as HTMLTextAreaElement;
      const text = el.childNodes[0] as any as string;
      el.setSelectionRange(text.length, text.length);
      el.focus();
    }
  }, [inputRef.current]);

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            onClick={(e) => {
              setEditMode(true);
              e.stopPropagation();
            }}
            className="p-3 w-[150px] text-center text-xs h-auto"
            style={{
              color: styles.color,
              backgroundColor: styles.bg,
              borderRadius: styles.bR,
            }}
          >
            {editMode ? (
              <textarea
                // @ts-ignore
                ref={inputRef}
                className="w-full border-none p-0 resize-none outline-none h-full text-center"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onBlur={() => {
                  nodeEdit(id, text);
                }}
                spellCheck={false}
                style={{ color: styles.color, backgroundColor: styles.bg }}
              />
            ) : (
              data.label
            )}
          </div>
        </ContextMenuTrigger>
        <NodeContextMenu id={id} />
      </ContextMenu>
    </motion.div>
  );
}

function NodeContextMenu({ id }: { id: string }) {
  return (
    <ContextMenuContent className="w-64">
      <ContextMenuItem inset>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem>
            Save Page As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>
        Show Bookmarks Bar
        <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup value="pedro">
        <ContextMenuLabel inset>People</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  );
}
