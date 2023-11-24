import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className=" absolute flex items-center justify-between w-screen top-2 px-4">
      <p className=" text-primary text-2xl font-bold tracking-wider">Flow</p>
      <div className=" flex items-center gap-2">
        <Button>Do something</Button>
        <Button size={"icon"} variant={"outline"}>
          <Link
            href={"https://github.com/divyamdotfoo/nextflow"}
            target="_blank"
          >
            <GithubIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
