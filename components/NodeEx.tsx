import { Dot } from "lucide-react";

export interface handleProp {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export default function NodeEx({
  handles,
  text,
  bg = "#fff",
  color = "#222",
  bR = "3px",
}: {
  handles: handleProp;
  text: string;
  bg?: string;
  color?: string;
  bR?: string;
}) {
  return (
    <div
      className="p-3 w-[100px] text-center text-xs relative"
      style={{
        backgroundColor: bg,
        color: color,
        borderRadius: bR,
      }}
    >
      {handles.top && (
        <Dot
          size={36}
          className=" absolute -top-[10px] left-1/2 -translate-x-1/2"
        />
      )}
      {handles.right && (
        <Dot size={27} className=" absolute top-1/2 right-0 -translate-y-1/2" />
      )}
      {handles.left && (
        <Dot size={27} className=" absolute top-1/2 left-0 -translate-y-1/2" />
      )}
      {handles.bottom && (
        <Dot
          size={27}
          className=" absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      )}
      {text}
    </div>
  );
}
