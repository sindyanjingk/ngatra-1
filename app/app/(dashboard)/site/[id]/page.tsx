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

  console.log({data});

  // if (!data || data.userId !== session.user.id) {
  //   notFound();
  // }

  // const url = data.customDomain ? data.customDomain : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  // console.log({url});
  

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
  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        {/* <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold sm:text-3xl dark:text-white">
            Statistics for {data.name}
          </h1>
          <a
            href={`https://${url}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div> */}
        <StatisticsPage orders={orders}/>
      </div>
    </>
  );
}
