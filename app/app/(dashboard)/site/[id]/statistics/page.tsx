import StatisticsPage from "@/components/statistics/statisticsPage";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  const data = await prisma.sites.findFirst({
    where: {
      id: params.id
    }
  })

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const orders = await prisma.transaction.findMany({
    where: {
      siteId: params.id,
    },
    include: {
      user: true,
      sites: true,
      siteService: true,
    }
  })
  const url = data.customDomain ? data.customDomain : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <StatisticsPage orders={orders} />
      </div>
    </>
  );
}
