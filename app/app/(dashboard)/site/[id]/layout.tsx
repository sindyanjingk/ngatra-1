import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ReactNode } from "react";

export default async function SiteLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
  const sitePayment = await prisma.sitePaymentMethod.findFirst({
    where: {
      siteId: params.id
    }
  })
  return (
    <div className="w-screen min-h-screen bg-white text-gray-800">
      {!sitePayment && (
        <div className="flex h-12 flex items-center gap-x-8 jusity-center bg-gray-800 p-4 text-white">
          <div className="font-bold mb-4">Please add your payment method before start transaction. </div>
          <Link href={`/site/${params.id}/control/payments`}>
            <Button>Add</Button>
          </Link>
        </div>
      )}
      <Header id={params.id} />
      <div className="flex flex-col space-y-6 p-6">
        {children}
      </div>
    </div>
  );
}
