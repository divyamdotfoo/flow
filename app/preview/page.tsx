import PreviewFlow, { CopyCodeBtn, GoBack } from "@/components/PreviewFlow";

export default function Page() {
  return (
    <div className="relative w-screen h-screen">
      <PreviewFlow />
      <CopyCodeBtn />
      <GoBack />
    </div>
  );
}
