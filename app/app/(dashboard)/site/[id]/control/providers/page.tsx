import ProviderAds from ".././../../../../../../components/control/providers/provider-ads";
import YourProvider from ".././../../../../../../components/control/providers/your-provider";
import { getSession } from ".././../../../../../../lib/auth";
import prisma from ".././../../../../../../lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function Providers({
    params,
}: {
    params: { id: string };
}) {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    const data = await prisma.sites.findUnique({
        where: {
            id: params.id
        }
    })

    if (!data || data.userId !== session.user.id) {
        notFound();
    }

    const providers = await prisma.siteProviders.findMany({
        where: {
            siteId: params.id
        }
    })


    return (
        <>
            <div className="flex items-center justify-center sm:justify-start">
                <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <h1 className="font-cal text-xl font-semibold dark:text-white text-black">
                        Providers
                    </h1>
                </div>
            </div>
            <ProviderAds serviceUrl={`/site/${params.id}/services`} siteId={data.id}/>
            <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <h1 className="font-cal text-xl font-semibold dark:text-white text-black">
                    Your Providers For {data.name}
                </h1>
            </div>
            <YourProvider siteId={data.id} providers={providers}/>
        </>
    );
}
