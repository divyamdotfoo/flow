import Flow from "@/components/Flow";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  return (
    <div className=" w-screen h-screen flex relative">
      <Sidebar />
      <div className=" w-full relative">
        <Flow />
        <Navbar />
      </div>
    </div>
  );
}
