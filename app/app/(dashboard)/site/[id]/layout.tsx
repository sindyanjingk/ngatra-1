import Header from "@/components/header";
import { ReactNode } from "react";

export default function SiteLayout({ children, params }: { children: ReactNode, params: { id: string } }) {

  return (
    <div className="w-screen min-h-screen bg-white text-gray-800">
      <Header id={params.id} />
      <div className="flex flex-col space-y-6 p-6">
        {children}
      </div>
    </div>
  );
}
