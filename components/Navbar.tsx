import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import SeePreview from "./SeePreview";
import AddBtn from "./AddBtn";
export default function Navbar() {
  return (
    <div className=" absolute flex items-start justify-between w-screen top-2 px-6">
      <p className=" text-primary text-2xl font-bold tracking-wider">Flow</p>
      <div className=" flex items-start gap-3">
        <SeePreview />
        <div className=" flex flex-col items-start gap-4">
          <Button size={"icon"} variant={"outline"}>
            <Link href={"https://github.com/divyamdotfoo/flow"} target="_blank">
              <GithubIcon />
            </Link>
          </Button>
          <AddBtn />
        </div>
      </div>
    </div>
  );
}
